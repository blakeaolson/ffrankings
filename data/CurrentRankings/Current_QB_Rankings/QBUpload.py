import joblib
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from pymongo_get_database import get_database

qb_lin_reg = joblib.load('../QB_Models/qb_lin_reg1')
qb_data = pd.read_csv('../Current_QB_Rankings/current_qb_data')

qb_data.drop(['Rk', 'FantPos', 'Fmb', 'Tgt', 'Rec', 'RE_Yds', 'RE_TD', 'TD', 'PosRank', 'FL', 'Y/R', 'Y/A', 'Year'], axis=1, inplace=True)
player_data = qb_data.pop('Player')
player_team_data = qb_data.pop('Tm')

# Processing the data
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('std_scaler', StandardScaler())
])

data_prepared = num_pipeline.fit_transform(qb_data)
predictions = qb_lin_reg.predict(data_prepared)

rankings_list = []
i = 0
for item in predictions:
    rankings = {}
    player = player_data[i]
    rankings["name"] = player
    rankings["PPR"] = round(item, 2)
    rankings["position"] = "QB"
    rankings["team"] = player_team_data[i]
    rankings_list.append(rankings)
    i += 1

sorted_rankings_list = sorted(rankings_list, key=lambda d: d['PPR'], reverse=True)

rank = 1
for item in sorted_rankings_list:
    item["rank"] = rank
    rank += 1


dbname = get_database()
collection_name = dbname["QB"]
collection_name.insert_many(sorted_rankings_list)
print("Successful Upload to MongoDB")