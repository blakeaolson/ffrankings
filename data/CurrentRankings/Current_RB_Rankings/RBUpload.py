import joblib
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from pymongo_get_database import get_database

rb_lin_reg = joblib.load('./RB_Models/lin_reg_5')
rb_data = pd.read_csv('./Current_RB_Rankings/current_rb_data')

rb_data.drop(['Rk', 'FantPos', 'Cmp', 'P_Att', 'P_Yds', 'P_TD', 'Int', 'Fmb', 'PosRank', 'FL', 'Y/R', 'Y/A', 'Year'], axis=1, inplace=True)
player_data = rb_data.pop('Player')
player_team_data = rb_data.pop('Tm')

# Processing the data
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('std_scaler', StandardScaler())
])

data_prepared = num_pipeline.fit_transform(rb_data)
predictions = rb_lin_reg.predict(data_prepared)

rankings_list = []
i = 0
for item in predictions:
    rankings = {}
    player = player_data[i]
    rankings["name"] = player
    rankings["PPR"] = round(item, 2)
    rankings["position"] = "RB"
    rankings["team"] = player_team_data[i]
    rankings_list.append(rankings)
    i += 1

sorted_rankings_list = sorted(rankings_list, key=lambda d: d['PPR'], reverse=True)

rank = 1
for item in sorted_rankings_list:
    item["rank"] = rank
    rank += 1

# rankings_df = pd.DataFrame(rankings.items())
# sorted_rankings = rankings_df.sort_values(by=1, ascending=False)
# sorted_rankings.to_csv("Rankings", index=False)


dbname = get_database()
collection_name = dbname["RB"]
collection_name.insert_many(sorted_rankings_list)
print("Successful Upload to MongoDB")

