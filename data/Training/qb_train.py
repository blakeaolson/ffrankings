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

qb_data = pd.read_csv('../qb_data')
print(qb_data.head())

# Getting rid of NaN in labels
for ind in qb_data.index:
    label = qb_data['label'][ind]
    if math.isnan(label):
        qb_data.drop(ind, inplace=True)

qb_data['label'] = qb_data['label'].astype(float)
qb_data.drop(['Rk', 'Tm', 'FantPos', 'Fmb', 'Tgt', 'Rec', 'RE_Yds', 'RE_TD', 'TD', 'PosRank', 'FL', 'Y/R', 'Y/A'], axis=1, inplace=True)

train_set, test_set = train_test_split(qb_data, test_size=0.2, random_state=42)
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

joblib.dump(lin_reg, "qb_lin_reg1")
