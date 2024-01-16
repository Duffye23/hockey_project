# Creating a Neural Network to Predict Point Production in the NHL

For our final project, Danik and I chose to answer the question "Can we create a model that can accurately predict a player's point total?" </br>

To answer this question we chose to try three different machine learning algorithms and decide which of the three would be the most accurate. The models we chose to use were:

1. A linear regression model: We chose to run a Linear Regression as it is a prediction based algorithm that is able to take in our features and use them to predict our dependent variable. Though simple in terms of machine learning algorithms, it can beused to great effect.
2. A random forest model: Another form of regressor, the random forest algorith applies nuremours decision trees for added accuracy. We decided to test this one out as it was another model that we had learned in class and found that it more robust than the linear regression
3. A Neural Network: The most advanced model we learnt in class, this was added for its complexity and customizability. The Neural Network had to be configured differently from what we had done in class as we used it to classify rather than predict and that brought us a good challenge.

# Libraries

* Python 3.7.7
* Pandas 1.0.5
* Pymongo 3.9.0
* Seaborn 0.12.2
* Numpy 1.21.6
* Matplotlib 3.2.2
* Tensorflow 2.11.0
* Tensorflow.Addons 0.19.0
* SciKit-Learn 1.0.2

# Authors

* Danik Lafrance
* Evan Duffy

# Database Creation
We chose to create our database using MOngoDB as the interface MongoDB Compass allows for extremely simple database creation and data importing. Simply create your database 'hockey_project_db', and an initial collection, we used '2022-2023'. You then click "add data" and select the json/csv option. You will be prompted to select the corresponding .csv file. Once that is done, Compass imports your data and creates the necessary columns for the database. We then proceeded to create 2 new collections ufor the other season using the same method. Had we chosen to do this via SQL, we would have had to create the indivicdual Schemas for all three tables and initially we had over 100 columns so that would have been arduous. MongoDB Compass streamlined the process exponentially.


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

#Model Testing

Before testing the models, we we noticed that a new unnamed column was created when loading the .csv files and so we had to drop it before scaling and splitting our data.</br>
Seeing the new column:</br>
![image](https://github.com/Duffye23/hockey_project/assets/58863493/808d48f3-a564-45c9-b8fa-93ad60d4c67b)

We then split our data, and then scaled it in order to normalize our data and have our training and testing data isolated and ready for use.
![image](https://github.com/Duffye23/hockey_project/assets/58863493/a3e9972b-0cdd-470b-9048-d6c1ecfb4782)</br>
Below are the results for each model, and the refined Neural Net.

# Linear Regression Model Results
![image](https://github.com/Duffye23/hockey_project/assets/58863493/bf239af6-7f46-4f8a-967d-169796a878b7)

# Random Forest Model
![image](https://github.com/Duffye23/hockey_project/assets/58863493/6029376c-14f8-4cdf-8939-cbaed6d5a305)


# Neural Network Model
![image](https://github.com/Duffye23/hockey_project/assets/58863493/5567e2a3-aab8-4f2a-9eb9-a9b4f7b9e1d5)</br>
![image](https://github.com/Duffye23/hockey_project/assets/58863493/38234aab-c63c-4e8a-9bb7-e8737b1c8c41)


# Refining the Neural Netowrk
While the model seems to lose a bit of accuracy when it loaded, it still displays an R2 score of .8808 which is very robust and satisfactory for our project. We then apply it to the new validation data so that we can view its performance.
![image](https://github.com/Duffye23/hockey_project/assets/58863493/6f468094-8dc4-4115-befd-afe7e4ebd3f9)</br>
![image](https://github.com/Duffye23/hockey_project/assets/58863493/9cd0f822-3dee-4c24-aecc-76d989b8379e)



# Conclusion
In conclusion, we were able to successfully create 3 machine learning algorithms that could predict a players' point total fairly accurately. The Neural Network edged out the Linear regression in terms of R2 score in the model notebook making it the most accurate. We used that one in our evaluation of the new data and while it scored a lower R2 than it did on the training and test data, it still posted an R2 score of .8808 which more than meets the required .8 R2. This result does make sense as the Neural Network is able to be refined and tweaked the most out of the machine learning algorithms that we studied.


# Sources Used:
Carleton Bootcamp Lesson Plans and Activities</br>
Money Puck for the data: https://moneypuck.com/data.htm</br>
Calling all documents with pymongo: https://stackoverflow.com/questions/37941610/get-all-documents-of-a-collection-using-pymongo</br>
Seaborn multiplot grid explanation: https://seaborn.pydata.org/tutorial/axis_grids.html</br>
The xpert learning assistant for various checks</br>
