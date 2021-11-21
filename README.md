### What Is Twitter Dashboard On Akash?

Twitter Dashboard on Akash displays and keeps track of the follower counts of specified Twitter accounts. It is containerized and ready to be hosted on [Akash Network](https://akash.network/), a decentralized and permissionless marketplace for cloud computing.

### How To Deploy

Twitter Dashboard on Akash can be deployed by following the [Akash' official deployment guide](https://docs.akash.network/cli/deployment#create-the-deployment-configuration)

You will use `deploy.yaml` file in this repository for deployment. In `deploy.yaml`, you need to specify the `TWITTER_KEY` and `TWITTER_IDS` environment variables, while `DATABASE_URL` is an optional variable. 

`TWITTER_KEY` is the authentication key of your Twitter developer account, which is needed to access the Twitter APIs. You can apply for a developer account [here]( https://developer.twitter.com/). 

`TWITTER_IDS` is contains the twitter identifiers that you want display, as a string, Twitter identifiers separated with a space (without quotation marks). 

`DATABASE_URL` is an optional variable, which designates the location of an initial database. The file must be sqlite3 database and needs to be hosted on the public internet at the time of deployment. The schema for the database can be seen in `db-schema.sql`. This line should be removed from the `deploy.yaml` file if not used.

Therefore, your deploy.yaml should look something like this:

```
  ...
  image: kahilav1/twitter-dashboard-on-akash
  env:
    - TWITTER_KEY=AAAAAAAAAAAAAAAAAAAAAAyERJKDFwQK%2BIOno8MdkI095jgo%3DasOu%eraI42PvrekjTK24dpXuJEAwmDHktV5zVeAyRdozTZ8D
    - TWITTER_IDS=BarackObama elonmusk CocaCola pepsi
    - DATABASE_URL=http://example.com/database.db
    - PAGE_TITLE=My Twitter Dashboard
    - INTRODUCTION_TEXT=Welcome to My Twitter Dashboard! You can also use <a href="https://wikipedia.org/wiki/HTML">HTML notation</a> here.
    - PAGE_META_DESCRIPTION=This text will show up in search engines
  ...
```
