# when use this project, please run following codes before.

# import modules
import pandas as pd
from sqlalchemy import create_engine

# get data
data_csv = pd.read_csv('https://media.githubusercontent.com/media/microsoft/Bing-COVID-19-Data/master/data/Bing-COVID19-Data.csv', sep=',', usecols=[1,2,3,4,5,6,7,11,12,13],index_col='ISO3')

# clean data
dp = pd.DataFrame(data_csv)
dp = dp.loc['CHN']
dp['Updated'] = pd.to_datetime(dp['Updated'])
dp['AdminRegion1'] = dp['AdminRegion1'].fillna('china')
dp = dp.fillna(0)

# get&set labels
arr = dp['AdminRegion1'].unique()
arr2= ['china', 'Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu',
       'Guangdong', 'Guangxi', 'Guizhou', 'Hainan', 'Hebei',
       'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'InnerMongolia',
       'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Ningxia', 'Qinghai',
       'Shaanxi', 'Shandong', 'Shanghai', 'Shanxi', 'Sichuan', 'Tianjin',
       'Xinjiang', 'Xizang', 'Yunnan', 'Zhejiang']

# splite data
for i in arr:
    temp = dp.loc[dp['AdminRegion1']==f'{i}']
    temp.to_csv(f'data/{i}_data.csv')
    print(f'finish {i} data ')

# connect database
conn = create_engine('mysql+mysqldb://root:662606@localhost:3306/covid?charset=utf8') 

# write data tables
for i in range(32):
    df = pd.read_csv(f'data/{arr[i]}_data.csv',usecols=[1,2,3,4,5,6,7])
    df.to_sql(arr2[i].lower(),con=conn,if_exists='replace',index=False)

# finish workflow.