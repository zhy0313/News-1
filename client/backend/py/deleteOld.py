import myConnect
import datetime as dt
conn=myConnect.myConnect()
cursor=conn.cursor()
deadline=dt.datetime.now()-dt.timedelta(days=2)
types=['mli','sci']
for type in types:
    sql="DELETE FROM %s"%type+" WHERE time<'%s'" %deadline
    cursor.execute(sql)
myConnect.loseConnect(conn,cursor)