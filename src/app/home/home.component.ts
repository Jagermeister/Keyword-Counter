import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('textContent', { static: true }) textContent: ElementRef;

    oneGramList: any[][];
    twoGramList: any[][];
    threeGramList: any[][];

    oneRGramList: any[][];
    twoRGramList: any[][];
    threeRGramList: any[][];

    mostCommon = [
        'the',
        'be',
        'to',
        'of',
        'and',
        'a',
        'in',
        'that',
        'have',
        'I',
        'it',
        'for',
        'not',
        'on',
        'with',
        'he',
        'as',
        'you',
        'do',
        'at',
        'this',
        'but',
        'his',
        'by',
        'from',
        'they',
        'we',
        'say',
        'her',
        'she',
        'or',
        'will',
        'an',
        'my',
        'one',
        'all',
        'would',
        'there',
        'their',
        'what',
        'so',
        'up',
        'out',
        'if',
        'about',
        'who',
        'get',
        'which',
        'go',
        'when',
        'me',
        'make',
        'can',
        'like',
        'time',
        'no',
        'just',
        'him',
        'know',
        'take',
        'person',
        'into',
        'year',
        'your',
        'good',
        'some',
        'could',
        'them',
        'see',
        'other',
        'than',
        'then',
        'now',
        'look',
        'only',
        'come',
        'its',
        'over',
        'think',
        'also',
        'back',
        'after',
        'use',
        'two',
        'how',
        'our',
        'work',
        'first',
        'well',
        'way',
        'even',
        'new',
        'want',
        'because',
        'any',
        'these',
        'give',
        'day',
        'most',
        'us',
    ];

    constructor() { }

    ngOnInit() {
        this.textContent.nativeElement.value = `

        <p>Update: The Women's World Cup has completed for 2019. If you are looking for
        <a href="http://bit.ly/ByPyWC19">
        the dataset you can find it here</a>. Keep reading if you want to find out how to use Python to scrape web data.
        </p>
        <hr>
        <p>We are jumping right into a Jupyter Notebook. This familiar interface lets us skip
        over worrying about third party library versions and compatibility. If you want to
        use your own Python editor and virtual environment, there will be package versions
        provided below.</p>

        <p>This jump-start focuses on the very basics of a homegrown web scraping solution.
        Your project might be collecting and storing data for your own personal analysis. This won't
        be a large application, set to run on a predefined schedule, and integrating the results
        into a relational database. <b>This is a practical walkthrough resulting in a CSV after
        only a few steps.</b></p>

        <p>As the Women's World Cup 2019 wraps up this weekend, we take a look at the statistics
        available. Here we see a familiar structure when it comes to parsing the layout of websites.
        We have a page representing all the competing teams, we need to access each team's page and
        find a list of players. Once we visit each player's page, we need to store their statistics
        for our personal data analysis later on.</p>

        <a href="https://www.fifa.com/womensworldcup/teams/" rel="nofollow">Fifa Women's World Cup 2019 France</a> (www.fifa.com)

        <br><br>
        <div style="width: 100%; text-align: center;">
        <img style="width: 80%;" src="../../../assets/beyondpython/article/2/world_cup_pages.png" alt="Women's World Cup 2019 website">
        
        <br><br>
    </div> 
    <p>There are a few <a href="https://developers.google.com/web/tools/chrome-devtools/open" rel="nofollow">
    ways to open Chrome DevTools</a>. The easiest is to right click on the page and select "Inspect". This
    opens DevTools, which sometimes starts off within the page. You can pop this out using the settings in
    the top right.</p>
    <br><br>
    <img style="width: 100%; max-height: 300px;" src="../../../assets/beyondpython/article/2/chrome_dev_tools_popout.svg" alt="Chrome DevTools Dock Setting">
    <br><br>

    <p>Next we want to use the Element Selector to click on a team, so we can find the underlying HTML. There
    are many different ways a webpage can handle a mouse click and send a user to the next page. We need
    to make sure we understand the format of this page.</p>

    <br><br>
    <img style="width: 100%; max-height: 150px;" src="../../../assets/beyondpython/article/2/chrome_dev_tools_elements.svg" alt="Chrome DevTools Element Selector">
    <br><br>
    <img style="width: 100%; max-height: 300px;" src="../../../assets/beyondpython/article/2/element_selection_team.svg" alt="Chrome DevTools Element Selector - Teams">
    <br><br>
    Now we can see the format of the links (bottom of the image) within the page.
    <br>
    <code>
        &lt;a href="/womensworldcup/teams/team/1882883/"
    </code>
    <br>
    Move onto the team page to see how player's pages are linked.
    <br><br>
    <img style="width: 100%; max-height: 250px;" src="../../../assets/beyondpython/article/2/element_selection_player.svg" alt="Chrome DevTools Element Selector - Players">
    <br><br>
    <code>
        &lt;a href="/womensworldcup/players/player/298807/"
    </code>
    <br>

    <p>Normally finding the format of the links to follow will be straightforward like we saw.
    However, when we reach a page we want to parse data from, it can be much more complex to
    find a systematic way to extract the information.</p>

    <p>My first step is to change to the <i>Network</i> tab within DevTools (we have been working
        on the <i>Elements</i> tab) and visit (or refresh) a player's page. After a few seconds
        of loading, turn off recording network activity via the red recording icon in the top left.
        Sort by <i>Type</i>, we are looking to see if the data arrives directly within the webpage
        or if a separate request is made to fetch it (that we can also use). I am firstly
        looking at the names of the files for type "Document" and "xhr". If I see something interesting,
        clicking on it reveals a details panel where you can find the response your computer received.
    </p>
    <br><br>
    <img style="width: 100%; max-height: 250px;" src="../../../assets/beyondpython/article/2/chrome_dev_tools_network.svg" alt="Chrome DevTools Network Panel">
    <br><br>
    <img style="width: 100%; max-height: 250px;" src="../../../assets/beyondpython/article/2/chrome_dev_tools_network_player.svg" alt="Chrome DevTools Network Requests">
    <br><br>
    <p>Perfect! This looks exactly like the data we are after. It will be easier to parse this subset of
    the page. It looks like we have everything we need to start fetching and storing data.</p>
    <code>
        "/womensworldcup/teams/team/1882883/"<br>
        "/womensworldcup/players/player/298807/"<br>
        https://www.fifa.com/womensworldcup/players/player/298807/_libraries/_player-profile-data<br>
        https://www.fifa.com/womensworldcup/players/player/298807/_libraries/_player-statistics
    </code>
     
        <p>It will be easier to understand the coding, now that we have manually walked through what
        we want to accomplish. Let's look at the Python packages we will use:
        </p>
        <ul>
            <li><b>requests</b> - Making requests for webpages</li>
            <li><b>time</b> - Allowing us to pause or <i>sleep</i> between requests to avoid
                fetching pages faster than when we normally browse the web.
            </li>
            <li><b>re</b> - Parsing the data will utilize a pattern matching language known as Regular Expressions.
                This topic could be complex, but we are keeping it simple for the first script.
            </li>
        </ul>
<pre><code>
import time
import re
import requests

# Webpage addresses
TEAMS_ENDPOINT = r'https://www.fifa.com/womensworldcup/teams/'
TEAM_ENDPOINT = r'https://www.fifa.com/womensworldcup/teams/team/{}/'
</code></pre>

<pre><code>
response = requests.get(TEAMS_ENDPOINT)
</code></pre>

<pre><code>
response.text[:600]
&gt;&gt;&gt;
<blockquote>
&lt;!DOCTYPE html&gt;
&lt;html lang="en-GB" dir="ltr"&gt;

&lt;head&gt;
&lt;meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /&gt;
&lt;meta charset="utf-8" /&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" /&gt;

&lt;link rel="canonical" href="/womensworldcup/teams/" /&gt;




&lt;link rel="shortcut icon" href="https://img.fifa.com/image/upload/t_fe-auto/assets/img/icons/favicon.ico" /&gt;
&lt;link rel="icon" href="https://img.fifa.com/image/upload/t_fe-auto/assets/img/icons/favicon_16.png" sizes="16x16" /&gt;
&lt;link rel="icon" href="https://img.fifa.com
</blockquote>
</code></pre>
        <p>Alright, we definitely got the text of a webpage back! The next step is to extract the
        team ids to navigate to each team page. This isn't an exhaustive resource on
        Regular Expression patterns - well it isn't even an introduction. If you want to update the patterns
        be sure to reference the <a href="https://docs.python.org/3/library/re.html" rel="nofollow">
        documentation</a> and test your patterns with <a href="https://regex101.com/r/5eRCuf/1" rel="nofollow">
        an online tool</a>.
        <br><br>
        The pattern <code>https://www.fifa.com/womensworldcup/teams/team/(d+)/</code> uses <b>\d+</b>
        to match any digits/numbers it might find [<b>\d</b> means digit, <b>+</b> means 1 or more].
        </p>
<pre><code>
RX_TEAM = r'https://www.fifa.com/womensworldcup/teams/team/(d+)/'
teams = list(set(re.findall(RX_TEAM, response.text)))
</code></pre>

<pre><code>
response_teams = []
for team in [teams[0]]:
time.sleep(0.65)
response_teams.append(requests.get(TEAM_ENDPOINT.format(team)))
</code></pre>

<pre><code>
RX_PLAYER = r'/womensworldcup/players/player/(d+)/'

ALL_PLAYERS = {}
for response_text in response_teams:
players = {i: {} for i in set(re.findall(RX_PLAYER, response_text))}
ALL_PLAYERS.update(players)
</code></pre>

<pre><code>
ALL_PLAYERS

<blockquote>
{'31': {},
'322662': {},
'420472': {},
'251055': {},
'190358': {},
'357768': {},
'190362': {},
'398377': {},
'420479': {},
'321160': {},
'321158': {},
'251049': {},
'321165': {},
'215194': {},
'322658': {},
'322664': {},
'398373': {},
'357683': {},
'296328': {},
'395358': {},
'296327': {},
'357729': {},
'387316': {}}
</blockquote>
</code></pre>

    <p>So we have a dictionary which has the player ids mapped to another dictionary. Dictionaries
    are just ways to store data via a key. In a list, each item is stored one after another. If we
    want to find a specific element we will need to look at each item in the list until we find a
    match. Here, dictionaries allow us immediate access if we know the key. When looping over a
    dictionary you are given the key as seen below.</p>
<pre><code>
PLAYER_ENDPOINT = r'https://www.fifa.com/womensworldcup/players/player/{}/_libraries/_player-statistics'
PLAYER_BIO_ENDPOINT = r'https://www.fifa.com/womensworldcup/players/player/{}/_libraries/_player-profile-data'

for i, player_key in enumerate(ALL_PLAYERS):
if i % 10 == 0: print(f'{i}/{len(ALL_PLAYERS)}')

time.sleep(0.65)
response = requests.get(PLAYER_ENDPOINT.format(player_key))
ALL_PLAYERS[str(player_key)]['player_stats_raw'] = response.text

time.sleep(0.65)
response = requests.get(PLAYER_BIO_ENDPOINT.format(player_key))
ALL_PLAYERS[str(player_key)]['player_bio_raw'] = response.text
</code></pre>

    <p>Always break up fetching and parsing data. This way you can continue to evolve your parsing
    without continuing to request the same static data. This will also keep iterating on your code
    and not needing to wait for a web response. Repeated requests for the same resource may cause
    undue stress on the website and they may have automated means to block your future requests.</p>

<pre><code>
for player_key in ALL_PLAYERS:
print(player_key)
print('stats', ALL_PLAYERS[player_key]['player_stats_raw'][:300])
print('bio', ALL_PLAYERS[player_key]['player_bio_raw'][:300])

&gt;&gt;&gt;
<blockquote>
31
stats
div[data-wordtag="fifa_distancecoveredKmInPossession"],
div[data-wordtag="fifa_distancecoveredKmNotInPossession"],
div[data-wordtag="fifa_passesAttempted"],
div[data-wordtag="fifa_passescompleted"],
div[data-wordtag="fifa_shortPassesCompleted"],
div[data-wordtag="fifa_mediumPassesCompl

bio
&lt;div class="row fi-p--profile"&gt;
&lt;div class="col-xs-12 col-sm-6 col-flex"&gt;
&lt;div class="box-content clearfix"&gt;
&lt;a class="fi-p--link no-link" href="javascript:void(0)" data-player-id="31"&gt;
&lt;div class="fi-p "&gt;
&lt;div class="fi-p__picture"&gt;
&lt;svg id=
</blockquote>
</code></pre>

    <p>Take a look at the resulting HTML (even within your browser) and find common
    patterns in how the titles and data are presented. Often times the styling of the site
    requires a standard layout for grids and forms. Here we've already distilled the patterns
    which will capture the keys (name of the field) and values.</p>
    <p>When we get the values, they will need to be cleaned further. Maybe we have different units,
    some values showing distance and others just numbers. How will we handle birthdays, empty
    values, and numerical data?</p>
    <p>Review the individual values and look for common labels to remove. All heights have "cm" suffix?
    We should replace that so the data appears as a number. Birthdays are a little more complicated, but
    we have a solution for you. This is more along the lines of a one-time script. It doesn't have a
    robust classification and reporting system... but it works for this :) Remove "cm", remove duplicate spaces,
    remove "span" tags, take out parentheses.. an iterative process of reviewing the results and taking action.
    </p>

<pre><code>
import datetime
def player_stats_from_raw(stats_raw):
player_stats = {}
for stat in stats_raw:
value, key = stat
value = value.replace('%', '')
value = value.replace('cm', '')
value = re.sub(r'\s\s+', ' ', value.replace('\n', '')).strip()
value = re.sub(r'<!--?span.*?-->', '', value)
if '.' in value and len(value) &lt; 9:
value = float(value)
elif value == '':
value = 0
elif value.isdigit():
value = int(value)
elif any(char.isdigit() for char in value):
value = datetime.datetime.strptime(value, '%d %B %Y')
else:
value = value.lower()

key = key.replace('&nbsp;', '_').lower()
key = key.replace('&lt;', '')
key = re.sub(r'\s\s+', ' ', key.replace('\n', '')).strip()
key = re.sub(r'[\(\)\/\-\s]', '_', key)
player_stats[key] = value

return player_stats
</code></pre>
<pre><code>
RX_PLAYER_STAT = r'&lt;div class="fi-p__profile-number__number"&gt;(.*?)&lt;/div&gt;(.*?)&lt;/div&gt;'
RX_PLAYER_BIO_1 = r'&lt;div class="fi-p__(jerseyNum |name|country|role)"&gt;(.*?)&lt;/div&gt;'
RX_PLAYER_BIO_2 = r'&lt;div class="fi-p__profile.*?"&gt;(.*?)(?:&lt;div class="fi-p__profile|span).*?&gt;(.*?)&lt;/(?:div|span)&gt;'
for player_key in ALL_PLAYERS:
stats_raw = ALL_PLAYERS[player_key]['player_stats_raw']
player_stats_raw = re.findall(RX_PLAYER_STAT, stats_raw, re.DOTALL)
ALL_PLAYERS[str(player_key)].update(player_stats_from_raw(player_stats_raw))

bio_raw = ALL_PLAYERS[player_key]['player_bio_raw']
player_stats_raw = re.findall(RX_PLAYER_BIO_1, bio_raw, re.DOTALL)
player_stats_raw = [(b, a) for (a, b) in player_stats_raw]
ALL_PLAYERS[str(player_key)].update(player_stats_from_raw(player_stats_raw))

player_stats_raw = re.findall(RX_PLAYER_BIO_2, bio_raw, re.DOTALL)
player_stats_raw = [(b, a) for (a, b) in player_stats_raw]
ALL_PLAYERS[str(player_key)].update(player_stats_from_raw(player_stats_raw))
</code></pre>
    <p>If you are confident in the parsed values, it is time to delete the raw text and
    persist the data to csv.</p>
<pre><code>
headers = []
for player_key in ALL_PLAYERS:
if 'player_stats_raw' in ALL_PLAYERS[player_key]: del ALL_PLAYERS[player_key]['player_stats_raw']
if 'player_bio_raw' in ALL_PLAYERS[player_key]: del ALL_PLAYERS[player_key]['player_bio_raw']
ALL_PLAYERS[player_key]['id'] = player_key
headers += ALL_PLAYERS[player_key].keys()

headers = set(headers)
</code></pre>

<pre><code>
import csv

with open('world_cup.csv', 'w', newline='') as csvfile:
writer = csv.DictWriter(csvfile, fieldnames=headers)
writer.writeheader()
writer.writerows(ALL_PLAYERS.values())
</code></pre>
     
        <p>You'll find <i>world_cup.csv</i> in the same location as your notebook. On review,
        it doesn't look too bad! We have numeric data in all the columns - most columns are
        filled - names are populated. Now you should spot check the data by referencing back
        to the web pages to ensure each statistic has made it under the correct label.</p>

        <br><br>
        <img style="width: 100%; max-height: 300px;" src="../../../assets/beyondpython/article/2/world_cup_dataset.svg" alt="Women's World Cup Player Statistics">
        <br><br>

        <p>We made it through an entire Python web scraping application. We used builtin
        web tools to find the underlying links and data locations. We built a process that
        allowed us to iterate on each step separately - Fetch - Store - Parse - Data!</p>

        <p>Couldn't resist taking a look at how the data stacks up on a variety of attributes.</p>
        <br><br>
        <div style="width: 100%; text-align: center;">
            <h3>World Cup Top 4 Teams</h3>
            <img style="width: 80%; cursor: pointer;" onclick="window.open('../../../assets/beyondpython/article/2/world_cup_top4.png', '_blank')" src="../../../assets/beyondpython/article/2/world_cup_top4.png" alt="Women's World Cup Top 4 Teams">
            <br><br>
            <br><br>
            <h3>World Cup Statistic Histograms</h3>
            <img style="width: 80%; cursor: pointer;" onclick="window.open('../../../assets/beyondpython/article/2/world_cup_hist.png', '_blank')" src="../../../assets/beyondpython/article/2/world_cup_hist.png" alt="Women's World Cup Statistic Histograms">
            <br><br>
            <br><br>
            <h3>World Cup Players by Role</h3>
            <img style="width: 80%; cursor: pointer;" onclick="window.open('../../../assets/beyondpython/article/2/world_cup_role.png', '_blank')" src="../../../assets/beyondpython/article/2/world_cup_role.png" alt="Women's World Cup Players By Role">
        </div>
        <br><br><br>
        552 rows, 64 columns<br>
        <a href="http://bit.ly/ByPyWC19">Women's World Cup Player Dataset</a>
        <br><br>
        <pre><code>
import pandas as pd
df = pd.read_csv('http://bit.ly/ByPyWC19')</code></pre>
    
        
        `;
    }

    removeTags(content: string): string {
        const rxCodeTag = /<code.*?>[\s\S]*?<\/code>/gim;
        const rxFormTag = /<form.*?>[\s\S]*?<\/form>/gim;
        const rxImageTag = /<img [\s\S]*?\/?>/gim;
        const rxATag = /<a [\s\S]*?>/gim;
        const rxBrTag = /<br\/?>/gim;
        const rxCloseTag = /(<\/?p>|<\/a>|<hr\/?>|<\/?b>|<\/?i>|<\/?ul>|<\/?li>|<\/?h3>|<\/?pre>|<\/div>|<\/?blockquote>)/gim;
        const rxDivTag = /<div [\s\S]*?>/gim;
        const rxSpaces = /\s\s+/gim;
        const rxParen = /[\(\)\[\]\"\'\:\,\-]/gim;
        const rxPeriods = /\.+/gim;
        const rxSplit = /\s?[.!?]\s/gim;
        const rxFileName = /\S+\.csv/gim;
        const rxURL = /www\.\S+\.com/gim;

        return content.replace(rxCodeTag, '')
            .replace(rxFormTag, '')
            .replace(rxImageTag, '')
            .replace(rxATag, '')
            .replace(rxBrTag, '')
            .replace(rxCloseTag, '')
            .replace(rxDivTag, '')
            .replace(rxURL, '')
            .replace(rxFileName, '')
            .replace(rxParen, '')
            .replace(rxPeriods, '.')
            .replace(rxSpaces, ' ')
            .replace(rxSplit, '.')
            .trim();
    }

    removeMostCommon(content: string, count: number = 100): string {
        const rxATag = /<a [\s\S]*?>/gim;
        const rxAClose = /<\/a>/gim;
        const rxCommon = new RegExp('\\b(' + this.mostCommon.slice(0, count).join('|') + ')\\b', 'gim');
        return content
            .replace(rxATag, '')
            .replace(rxAClose, '')
            .replace(rxCommon, '');
    }

    splitContent(content: string): string[] {
        return content.split(/[.]/);
    }

    ngramCount(sentences: string[]) {
        const oneGram = {};
        const twoGram = {};
        const threeGram = {};
        for (let i = 0, l = sentences.length; i < l; i++) {
            const words = sentences[i].split(' ');
            const trailingWords = [];
            for (let iw = 0, lw = words.length; iw < lw; iw++) {
                const word = words[iw];
                trailingWords.push(word);
                oneGram[trailingWords[iw]] = (oneGram[trailingWords[iw]] | 0) + 1;
                if (iw > 0) {
                    const twoKey = trailingWords[iw - 1] + ' ' + trailingWords[iw];
                    twoGram[twoKey] = (twoGram[twoKey] | 0) + 1;
                }

                if (iw > 1) {
                    const threeKey = trailingWords[iw - 2] + ' ' + trailingWords[iw - 1] + ' ' + trailingWords[iw];
                    threeGram[threeKey] = (threeGram[threeKey] | 0) + 1;
                }
            }
        }

        return [oneGram, twoGram, threeGram];
    }

    sortDictionary(dict) {
        const items = Object.keys(dict).map(key => [key, dict[key]]);
        items.sort((first, second) => second[1] - first[1]);
        return items;
    }

    countContent() {
        const content = this.textContent.nativeElement.value;
        const noTagContent = this.removeTags(content);
        this.textContent.nativeElement.value = noTagContent;
        const sentences = this.splitContent(noTagContent);
        let oneGram, twoGram, threeGram;
        /*
        [oneGram, twoGram, threeGram] = this.ngramCount(sentences);
        this.oneGramList = this.sortDictionary(oneGram).slice(0, 25).filter(g => g[1] > 2);
        this.twoGramList = this.sortDictionary(twoGram).slice(0, 25).filter(g => g[1] > 2);
        this.threeGramList = this.sortDictionary(threeGram).slice(0, 25).filter(g => g[1] > 2);
        */
        [oneGram, twoGram, threeGram] = this.ngramCount(this.splitContent(this.removeTags(this.removeMostCommon(content))));
        this.oneGramList = this.sortDictionary(oneGram).slice(0, 20).filter(g => g[1] > 2);
        this.twoGramList = this.sortDictionary(twoGram).slice(0, 20).filter(g => g[1] > 2);
        this.threeGramList = this.sortDictionary(threeGram).slice(0, 20).filter(g => g[1] > 2);

    }
}
