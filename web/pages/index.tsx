import { useEffect } from "react";
import { connect } from "react-redux";
import {
  useGetTweetsQuery,
  LoggedUser,
  useHasANewTweetSubscription,
} from "~graphql/generated/graphql";
import Auth from "~components/Authentication";
import { Page, Column } from "~components/PageTemplate";
import Home from "~features/home";
import { TweetsStore } from "~store/tweets";
import { actions } from "~store";
import SidebarShortCuts from "~components/SidebarShortcuts";
import RightSidebar from "~components/RightSidebar";

type HomePageType = {
  user: Partial<LoggedUser>;
  tweets: TweetsStore;
};

function HomePage({ user, tweets }: HomePageType): JSX.Element {
  const { data, refetch, loading } = useGetTweetsQuery();
  const subscriptions = useHasANewTweetSubscription();

  useEffect(() => {
    if (
      subscriptions?.data?.hasANewTweet?.createdAt &&
      user._id !== subscriptions?.data?.hasANewTweet.authorId
    ) {
      actions.addNewTweet();
    }
  }, [subscriptions?.data?.hasANewTweet?.createdAt]);

  const onResetTweetsCounter = () => {
    refetch();
    actions.resetTweetsCounter();
  };

  return (
    <Auth>
      <Page>
        <Column>
          <SidebarShortCuts />
        </Column>
        <Column>
          <Home
            onResetTweetsCounter={onResetTweetsCounter}
            newTweets={tweets.newTweets}
            loading={loading}
            refetch={refetch}
            tweets={data?.getTweets}
            user={user}
          />
        </Column>
        <Column>
          <RightSidebar />
        </Column>
      </Page>
    </Auth>
  );
}

export default connect(({ user, tweets }: HomePageType, props) => ({
  user,
  tweets,
  ...props,
}))(HomePage);
