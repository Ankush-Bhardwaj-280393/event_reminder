from flask import Flask,render_template
import pandas as pd
import datetime 

app=Flask(__name__)

birthday_df=pd.read_excel("data/birthdays.xlsx")
anniversary_df=pd.read_excel("data/anniversaries.xlsx")

def filter_data():
    today_date=datetime.date.today().strftime("%d/%m")

    birthday_df["date_only"]=birthday_df["Birthday"].apply(lambda x: x.strftime("%d/%m"))
    anniversary_df["date_only"]=anniversary_df["Anniversary"].apply(lambda x: x.strftime("%d/%m"))

    birthday_filter_df=birthday_df[birthday_df["date_only"]==today_date]
    anniversary_filter_df=anniversary_df[anniversary_df["date_only"]==today_date]

    anniversary_filter_df["pair_name"]=anniversary_filter_df["Name"]+"----"+anniversary_filter_df["Spouse"]

    return birthday_filter_df["Name"],anniversary_filter_df["pair_name"]

@app.route("/")
def index_page():
    birthday_today,anniversary_today=filter_data()   
    return render_template("index.html",
                           birthday_today=birthday_today,
                           anniversary_today=anniversary_today)

if __name__=="__main__":
    app.run(host="0.0.0.0", debug=True)
