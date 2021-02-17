import { useCallback, useEffect } from "react";
import TweetCard from "~components/Tweet";
import TweetInput from "~components/TweetInput";
import {
  useNewTweetMutation,
  useDeleteTweetMutation,
  useLikeMutation,
  useDeslikeMutation,
  Tweet,
  LoggedUser,
} from "~graphql/generated/graphql";
import { Column } from "~components/template";

export type HomeProps = {
  tweets?: Tweet[];
  user: LoggedUser;
  loading: boolean;
  refetch: () => void;
};

export default function Home({
  tweets = [],
  user,
  refetch,
}: HomeProps): JSX.Element {
  const [onSubmitNewTweet] = useNewTweetMutation();
  const [onDeleteTweet] = useDeleteTweetMutation();
  const [onLikeTweet] = useLikeMutation();
  const [onDeslikeTweet] = useDeslikeMutation();

  useEffect(() => {
    refetch();
  }, []);

  const onSubmitNewTweetHandler = useCallback(async (content) => {
    await onSubmitNewTweet({
      variables: {
        token: user.token,
        content,
      },
    });
    refetch();
  }, []);

  const onDeleteTweetHandler = useCallback(async (_id: string) => {
    await onDeleteTweet({
      variables: {
        _id,
        token: user.token,
      },
    });
    refetch();
  }, []);

  const onLikeTweetHandler = useCallback(async (_id: string) => {
    await onLikeTweet({
      variables: {
        _id,
        token: user.token,
      },
    });
  }, []);

  const onDeslikeTweetHandler = useCallback(async (_id: string) => {
    await onDeslikeTweet({
      variables: {
        _id,
        token: user.token,
      },
    });
  }, []);

  return (
    <Column>
      <TweetInput
        userName={user.name}
        onSubmitNewTweet={onSubmitNewTweetHandler}
      />

      {tweets.map(({ _id, likedBy, ...tweet }) => {
        return (
          <TweetCard
            {...tweet}
            likedBy={likedBy}
            onLikeTweetHandler={onLikeTweetHandler}
            onDeslikeTweetHandler={onDeslikeTweetHandler}
            onDeleteTweet={onDeleteTweetHandler}
            haveLikedTweet={likedBy.includes(user._id)}
            key={_id}
          />
        );
      })}
    </Column>
  );
}
