def getTrans(link):
    from youtube_transcript_api import YouTubeTranscriptApi
    # https://www.youtube.com/watch?v=cmpRLQZkTb8
    # https://www.youtube.com/watch?v=6HUCI4GWu28
    # https://www.youtube.com/watch?v=KOdfpbnWLVo
    video_id = link.split("v=")[1]
    # video_id = 'KOdfpbnWLVo'
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    answer = ""
    #print(transcript[len(transcript) - 1]['text'])

    for i in range(len(transcript)):
        answer += transcript[i]['text'] + ' '
    final= answer.replace('\n', '')   
    return final


if __name__ == "__main__":
    print(getTrans("https://www.youtube.com/watch?v=KOdfpbnWLVo"))
