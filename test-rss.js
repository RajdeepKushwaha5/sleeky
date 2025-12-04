import Parser from 'rss-parser';

async function testRSS() {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://medium.com/feed/@rajdeep01');
    console.log(`Found ${feed.items.length} posts`);
    console.log('First post:', feed.items[0]?.title);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testRSS();