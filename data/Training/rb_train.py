import pandas as pd
import math
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestRegressor
import joblib

rb_data = pd.read_csv('../rb_data')

# Getting rid of NaN in labels
for ind in rb_data.index:
    label = rb_data['label'][ind]
    if math.isnan(label):
        rb_data.drop(ind, inplace=True)

rb_data['label'] = rb_data['label'].astype(float)
rb_data.drop(['Rk', 'Tm', 'FantPos', 'Cmp', 'P_Att', 'P_Yds', 'P_TD', 'Int', 'Fmb', 'PosRank', 'FL', 'Y/R', 'Y/A'], axis=1, inplace=True)

train_set, test_set = train_test_split(rb_data, test_size=0.2, random_state=42)
label_train = train_set.pop('label')
label_test = test_set.pop('label')

player_train = train_set.pop('Player')
player_test = test_set.pop('Player')

year_train = train_set.pop('Year')
year_test = test_set.pop('Year')
print("average label: ", label_train.mean())

# Processing the data
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('std_scaler', StandardScaler())
])

# Training Linear regression
rb_data_prepared_train = num_pipeline.fit_transform(train_set)
lin_reg = LinearRegression()
lin_reg.fit(rb_data_prepared_train, label_train)

# Evaluating Linear regression
rb_predictions = lin_reg.predict(rb_data_prepared_train)
lin_mse = mean_squared_error(label_train, rb_predictions)
lin_rmse = np.sqrt(lin_mse)
print(lin_rmse)

some_data = train_set.iloc[:5]
some_labels = label_train.iloc[:5]
some_players = player_train.iloc[:5]
some_years = year_train.iloc[:5]

some_data_prepared = num_pipeline.transform(some_data)
print("Predictions: ", lin_reg.predict(some_data_prepared))
print("Labels: ", list(some_labels))
print("Players: ", list(some_players))
print("Years: ", list(some_years))


# # Training Decision Tree
# tree_reg = DecisionTreeRegressor()
# tree_reg.fit(rb_data_prepared_train, label_train)
# # Evaluating Decision Tree
# tree_rb_predictions = tree_reg.predict(rb_data_prepared_train)
# tree_mse = mean_squared_error(label_train, tree_rb_predictions)
# tree_rmse = np.sqrt(tree_mse)
#
# scores = cross_val_score(tree_reg, rb_data_prepared_train, label_train, scoring='neg_mean_squared_error', cv=10)
# tree_rmse_scores = np.sqrt(-scores)
# print(tree_rmse_scores.mean())
#
# # Training Random Forest
# forest_reg = RandomForestRegressor()
# forest_reg.fit(rb_data_prepared_train, label_train)
# # Evaluating Random Forest
# forest_rb_predictions = forest_reg.predict(rb_data_prepared_train)
# forest_mse = mean_squared_error(label_train, forest_rb_predictions)
# forest_rmse = np.sqrt(forest_mse)
#
# forest_scores = cross_val_score(forest_reg, rb_data_prepared_train, label_train, scoring='neg_mean_squared_error', cv=10)
# forest_rmse_scores = np.sqrt(-forest_scores)
# print("mean: ", forest_rmse_scores.mean())

# joblib.dump(lin_reg, "lin_reg_5")
