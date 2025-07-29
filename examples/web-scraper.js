/**
 * Web Scraper Example
 * Demonstrates browser automation for data extraction
 */

const puppeteer = require('puppeteer');

class WebScraper {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async initialize() {
        try {
            this.browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            this.page = await this.browser.newPage();
            console.log('✅ Browser initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize browser:', error);
            throw error;
        }
    }

    async scrapeNewsHeadlines(url) {
        try {
            console.log(`📰 Scraping news headlines from: ${url}`);
            await this.page.goto(url, { waitUntil: 'networkidle2' });
            
            // Extract headlines (this is a generic example)
            const headlines = await this.page.evaluate(() => {
                const elements = document.querySelectorAll('h1, h2, h3, .headline, .title');
                return Array.from(elements, el => ({
                    text: el.textContent.trim(),
                    tag: el.tagName.toLowerCase(),
                    className: el.className
                })).filter(item => item.text.length > 10);
            });

            console.log(`📊 Found ${headlines.length} headlines`);
            return headlines;
        } catch (error) {
            console.error('❌ Error scraping headlines:', error);
            throw error;
        }
    }

    async scrapeEcommerceProducts(url) {
        try {
            console.log(`🛒 Scraping products from: ${url}`);
            await this.page.goto(url, { waitUntil: 'networkidle2' });
            
            const products = await this.page.evaluate(() => {
                const productElements = document.querySelectorAll('.product, .item, [data-product]');
                return Array.from(productElements, el => ({
                    name: el.querySelector('.name, .title, h3')?.textContent?.trim() || 'Unknown',
                    price: el.querySelector('.price, .cost')?.textContent?.trim() || 'N/A',
                    image: el.querySelector('img')?.src || null,
                    link: el.querySelector('a')?.href || null
                }));
            });

            console.log(`📊 Found ${products.length} products`);
            return products;
        } catch (error) {
            console.error('❌ Error scraping products:', error);
            throw error;
        }
    }

    async takeScreenshot(url, filename = 'screenshot.png') {
        try {
            console.log(`📸 Taking screenshot of: ${url}`);
            await this.page.goto(url, { waitUntil: 'networkidle2' });
            await this.page.screenshot({ 
                path: filename, 
                fullPage: true 
            });
            console.log(`✅ Screenshot saved as: ${filename}`);
        } catch (error) {
            console.error('❌ Error taking screenshot:', error);
            throw error;
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            console.log('🔒 Browser closed');
        }
    }
}

// Example usage
async function main() {
    const scraper = new WebScraper();
    
    try {
        await scraper.initialize();
        
        // Example 1: Scrape news headlines
        const headlines = await scraper.scrapeNewsHeadlines('https://news.ycombinator.com');
        console.log('Headlines:', headlines.slice(0, 5));
        
        // Example 2: Take a screenshot
        await scraper.takeScreenshot('https://google.com', 'google-homepage.png');
        
    } catch (error) {
        console.error('Main error:', error);
    } finally {
        await scraper.close();
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = WebScraper;