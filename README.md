# Creating a Neural Network to Predict Point Production in the NHL

For our final project, Danik and I chose to answer the question "Can we create a model that can accurately predict a player's point total?" </br>

To answer this question we chose to try three different machine learning algorithms and decide which of the three would be the most accurate. The models we chose to use were:

1. A linear regression model: We chose to run a Linear Regression as it is a prediction based algorithm that is able to take in our features and use them to predict our dependent variable. Though simple in terms of machine learning algorithms, it can beused to great effect.
2. A random forest model: Another form of regressor, the random forest algorith applies nuremours decision trees for added accuracy. We decided to test this one out as it was another model that we had learned in class and found that it more robust than the linear regression
3. A Neural Network: The most advanced model we learnt in class, this was added for its complexity and customizability. The Neural Network had to be configured differently from what we had done in class as we used it to classify rather than predict and that brought us a good challenge.

# Data Exploration
We pulled our data from https://moneypuck.com/data.htm as the website had complete datasets for NHL seasons including every player in the league going back 15 years to 2008. We decided to only use the previous year, 2022-2023, as our training and testing data set as it was the most recent and was within the same era of hockey as the current season so its data would be the most applicable when we validated our algorithm using this season's, 2023-2024, current data. The dataset that we had included over 100 columns and 3000 rows, and not all of it was pertinent to our initial question. We ended up pairing our data down to 19 columns and just over 800 rows. We removed irrelevant columns, and decided to remove the copies of players in different game type situations (5on5, 4on5, etc.). We also created a new column to measure the impact a palyer's icetime per game would have. 

We then saved the modified .csvs and imported them into a nonrelational database using MongDB Compass for easy importing. With the data on our database, we used the pymongo library to read the data into a Jupyter notebook and ran our exploratory data analysis.

A look at our dataframe's column breakdown:
![image](https://github.com/Duffye23/hockey_project/assets/58863493/6a9fa0a9-af5c-40cf-ac9c-803ed39c1ca7)

We ran .describe() on our dataframe to make sure there were numbers that made sense for our purposes, and then used the seaborn library to pair our features to our dependdent variable.

The .describe() output:
![image](https://github.com/Duffye23/hockey_project/assets/58863493/3f178c1f-e33e-45f6-b10e-7f2445baff89)

The pairplots:
![image](https://github.com/Duffye23/hockey_project/assets/58863493/0bceb6e2-34c6-4e3c-818a-d0a6d34b7551)


We had a few columns that we knew would need to be dropped right away, mainly _id and name, but we ran a correlation matrix to dive deeper into the relationships of data.
![correlation_matrix_predrop](https://github.com/Duffye23/hockey_project/assets/58863493/2be2c697-6d3e-45b2-9df7-b00adc5ef6b0)


We then dropped the columns that had low correlation and redid our heatmap.
![correlation_matrix_postdrop](https://github.com/Duffye23/hockey_project/assets/58863493/1005ef44-790d-4be0-bf2a-7e98c3bd383d)

We then saved our new .csvs to be used with our models.





