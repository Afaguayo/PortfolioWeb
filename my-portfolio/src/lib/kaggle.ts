// Kaggle entries shown in the KAGGLE section. To change a score, edit `score` below.

export const KAGGLE_PROFILE = "https://www.kaggle.com/afaguayo";
export const KAGGLE_REPO = "https://github.com/Afaguayo/kaggle-entries";

export type KaggleEntry = {
  name: string;
  competition: string; // competition page
  metric: string;
  score: string; // public leaderboard score, shown as-is
  code: string; // folder in the kaggle-entries repo
  approach?: string; // optional one-liner
};

export const kaggleEntries: KaggleEntry[] = [
  {
    name: "Titanic",
    competition: "https://www.kaggle.com/competitions/titanic",
    metric: "Accuracy",
    score: "0.782",
    code: `${KAGGLE_REPO}/tree/main/titanic`,
  },
  {
    name: "House Prices",
    competition: "https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques",
    metric: "RMSLE",
    score: "0.122",
    code: `${KAGGLE_REPO}/tree/main/house-prices`,
  },
  {
    name: "Housing Prices (Kaggle Learn)",
    competition: "https://www.kaggle.com/competitions/home-data-for-ml-course",
    metric: "MAE",
    score: "$12,705",
    code: `${KAGGLE_REPO}/tree/main/housing-prices-learn`,
  },
  {
    name: "Digit Recognizer",
    competition: "https://www.kaggle.com/competitions/digit-recognizer",
    metric: "Accuracy",
    score: "0.9963",
    code: `${KAGGLE_REPO}/tree/main/digit-recognizer`,
    approach: "3-seed CNN ensemble",
  },
  {
    name: "Spaceship Titanic",
    competition: "https://www.kaggle.com/competitions/spaceship-titanic",
    metric: "Accuracy",
    score: "0.805",
    code: `${KAGGLE_REPO}/tree/main/spaceship-titanic`,
  },
  {
    name: "NLP Disaster Tweets",
    competition: "https://www.kaggle.com/competitions/nlp-getting-started",
    metric: "F1",
    score: "0.800",
    code: `${KAGGLE_REPO}/tree/main/nlp-disaster-tweets`,
    approach: "TF-IDF + logistic regression",
  },
  {
    name: "Store Sales (time series)",
    competition: "https://www.kaggle.com/competitions/store-sales-time-series-forecasting",
    metric: "RMSLE",
    score: "0.424",
    code: `${KAGGLE_REPO}/tree/main/store-sales`,
    approach: "Global gradient boosting, 16-day direct forecast",
  },
  {
    name: "Airline Satisfaction (Playground S6E10)",
    competition: "https://www.kaggle.com/competitions/playground-series-s6e10",
    metric: "ROC AUC",
    score: "0.958",
    code: `${KAGGLE_REPO}/tree/main/airline-satisfaction-s6e10`,
  },
];
