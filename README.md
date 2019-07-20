# Keyword Counter

_Keyword Counter_ provides statistics on the use of words and phrases. This looks at the most used groups of 1, 2, and 3 phrases. Now you can understand if the content you are generating is reinforcing a common theme. For instance, if you were hoping to talk about fitness and weight loss but seem to continue to most frequently use unrelated words.. it might be a sign that you should revisit the main theme of each paragraph.

Currently, the statistics will remove the [100 most common words in English](https://en.wikipedia.org/wiki/Most_common_words_in_English) when calculating.

## Material Card Content
`(Array.from(document.getElementsByTagName('mat-card-content')).map(m => m.innerHTML)).join(' ')`

