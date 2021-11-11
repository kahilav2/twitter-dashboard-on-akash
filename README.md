# twitter-dashboard-on-akash

Twitter Dashboard on Akash displays, and keeps track of the follower counts of specified Twitter accounts. It is containerized and ready to be hosted on [Akash Network](https://akash.network/), a decentralized and permissionless marketplace for compute.

### How to deploy

Twitter Dashboard on Akash can be deployed by following the [official deployment guide](https://docs.akash.network/cli/deployment#create-the-deployment-configuration)

You will use `deploy.yaml` file in this repository for deployment. In `deploy.yaml`, you need to specify the `TWITTER_KEY`, `DATABASE_URL`, `TWITTER_IDS` environment variables. 

`TWITTER_KEY` is the authentication key of your Twitter developer account, which is needed to access the Twitter APIs. You can apply for a developer account [here]( https://developer.twitter.com/). 

`TWITTER_IDS` is contains the twitter identifiers that you want display, as a string, Twitter identifiers separated with a space (without quotation marks). 

`DATABASE_URL` is where Twitter Dashboard gets its initial data in the form of a sqlite database. The file needs to be hosted on the public internet at the time of deployment. The schema for the database can be seen in db-schema.sql.

Therefore, your deploy.yaml should look something like this:

```
  image: kahilav1/twitter-dashboard-on-akash
  env:
    - TWITTER_KEY=AAAAAAAAAAAAAAAAAAAAAAyERJKDFwQK%2BIOno8MdkI095jgo%3DasOu%eraI42PvrekjTK24dpXuJEAwmDHktV5zVeAyRdozTZ8D
    - DATABASE_URL=http://example.com/database.db
    - TWITTER_IDS=BarackObama elonmusk CocaCola pepsi
```
