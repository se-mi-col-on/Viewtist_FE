import { StreamingData, StreamingListArray } from '../types/interface';

export const filterStreamer = (
  liveStreamingList: StreamingListArray = [],
  searchKey: string,
): StreamingData[] => {
  const lowerSearchKey = searchKey.toLowerCase();

  // 스트리머 이름과 일치하는 키워드 수 계산
  const keyWithMatchCount = liveStreamingList.map(({ streamerNickname }) => {
    const lowerUserId = streamerNickname.toLowerCase();
    const matchCount = lowerUserId.split(lowerSearchKey).length - 1;
    return { streamerNickname, matchCount };
  });

  // 일치하는 키워드 수를 기준으로 스트리밍 리스트 정렬 (0개는 제외)
  const sortedStreamingList = keyWithMatchCount
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(
      ({ streamerNickname }) =>
        liveStreamingList.find((data) => data.streamerNickname === streamerNickname)!,
    );

  // 정렬된 스트리밍 리스트 반환
  return sortedStreamingList;
};
