type StreamingData = {
  id: number;
  user_id: string;
  title: string;
  category: string;
  start_at: string;
  viewer_count: number;
  transmission_method: string;
  created_at: string;
  modified_at: string;
};

type StreamingListArray = StreamingData[];

export const filterAndSortedStreamerByKeyword = (
  liveStreamingList: StreamingListArray, // 타입 지정 추가
  searchKey: string,
): StreamingData[] => {
  const lowerSearchKey = searchKey.toLowerCase();

  // 스트리머 이름과 일치하는 키워드 수 계산
  const keyWithMatchCount = liveStreamingList.map(({ user_id }) => {
    const lowerUserId = user_id.toLowerCase();
    const matchCount = lowerUserId.split(lowerSearchKey).length - 1;
    return { user_id, matchCount };
  });

  // 일치하는 키워드 수를 기준으로 스트리밍 리스트 정렬 (0개는 제외)
  const sortedStreamingList = keyWithMatchCount
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(({ user_id }) => liveStreamingList.find((data) => data.user_id === user_id)!);

  // 정렬된 스트리밍 리스트 반환
  return sortedStreamingList;
};
