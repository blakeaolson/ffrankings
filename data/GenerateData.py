import requests
from bs4 import BeautifulSoup
import pandas as pd
import matplotlib.pyplot as plt
import re
import time

START_YEAR = 2000

def getTable(year):
    URL = "https://www.pro-football-reference.com/years/{}/fantasy.htm".format(year)
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    table = soup.find('table', {'id': 'fantasy'})
    df = pd.read_html(str(table))[0]

    # Getting rid of all of the useless columns
    df.columns = df.columns.droplevel(level=0)
    df.drop(['FantPt', 'DKPt', 'FDPt', 'VBD', 'OvRank', '2PM', '2PP'], axis=1, inplace=True)
    for i in range(29, df.shape[0], 31):
        df.drop(i, axis=0, inplace=True)

    # Converting cols from object to float
    for col in df:
        if col == "Tm" or col == "FantPos" or col == "Player": continue
        df[col] = df[col].astype(float)
    df.reset_index(drop=True, inplace=True)

    # Processing player name data
    for ind in df['Player'].index:
        player = df['Player'][ind]
        df['Player'] = df['Player'].replace([player], re.sub(r'[^A-Za-z0-9 ]+', '', player))

    # Accounting for duplicate names
    value_counts = df['Player'].value_counts().to_dict()
    for i, value in enumerate(df['Player']):
        # If the value has duplicates
        if value_counts[value] > 1:
            # Append a number to the value to make it distinct
            df.at[i, 'Player'] = str(value) + '_' + str(i)

    return df


class PositionTable:
    def __init__(self):
        self.frames = []
        for i in range(START_YEAR, 2023, 1):
            print(i)
            # Getting the table
            temp_df = getTable(str(i))
            temp_df.drop(temp_df.index[250:], axis=0, inplace=True)

            # Adding the year
            yr = [i] * temp_df.shape[0]
            yr_df = pd.DataFrame(yr, columns=['Year'], dtype=int)
            temp_df = temp_df.join(yr_df)

            self.frames.append(temp_df)

        # Concat all the years that are able to be labeled
        useful_frames = self.frames[:]
        self.current_year = useful_frames.pop()
        self.df = pd.concat(useful_frames)
        self.df.reset_index(drop=True, inplace=True)

    def plotData(self):
        self.df.hist(bins=50, figsize=(20, 15))
        plt.show()

    def correlationMatrix(self):
        corr_matrix = self.df.corr()
        print(corr_matrix["PPR"].sort_values(ascending=False))

    def createLabels(self):
        # 1) Iterate through current df and get each players name and year
        # 2) Access that players future year in the frames dataframe list
        # 3) If it does not exist then delete the row in the dataframe
        # 4) Within the players future year, access their PPR points and append to label list
        # 5) Join the label list and the dataframe
        print('Creating labels')
        label_list = []
        for ind in self.df.index:
            year = self.df['Year'][ind]
            name = self.df['Player'][ind]

            future_df = self.frames[year - START_YEAR + 1]
            if name in future_df['Player'].unique():
                future_df.set_index('Player', drop=False, inplace=True)
                label_list.append(future_df.loc[name]['PPR'])
            else:
                self.df.drop(ind, axis=0, inplace=True)

        self.df['label'] = label_list
        self.df.reset_index(drop=True, inplace=True)


table = PositionTable()
table.createLabels()
print(table.df)

current_data = table.current_year.loc[table.current_year['FantPos'] == 'TE']
current_data.to_csv('current_te_data', index=False)

qb_data = table.df.loc[table.df['FantPos'] == 'QB']
rb_data = table.df.loc[table.df['FantPos'] == 'RB']
wr_data = table.df.loc[table.df['FantPos'] == 'WR']
te_data = table.df.loc[table.df['FantPos'] == 'TE']

qb_data.to_csv('qb_data', index=False)
rb_data.to_csv('rb_data', index=False)
wr_data.to_csv('wr_data', index=False)
te_data.to_csv('te_data', index=False)

# print(qb_data.sort_values(by="PPR", ascending=False))
# print(rb_data.sort_values(by="PPR", ascending=False))
# print(wr_data.sort_values(by="PPR", ascending=False))
# print(te_data.sort_values(by="PPR", ascending=False))




