# SEO Optimization Verification Guide - Step 3: Sitemap & Robots.txt

## How to Verify Sitemap and Robots.txt Are Working

### Method 1: Direct URL Test in Browser

1. **Start your development server:**
   ```bash
   npm run build
   npm run serve:ssr:colne-tyre-centre
   # or: node dist/colne-tyre-centre/server/server.mjs
   ```

2. **Test robots.txt:**
   - Visit: `http://localhost:4000/robots.txt`
   - Should see plain text content:
   ```
   User-agent: *
   Allow: /
   Disallow: /admin
   Disallow: /api
   
   Sitemap: https://northvalleytyres.com/sitemap.xml
   ```

3. **Test sitemap.xml:**
   - Visit: `http://localhost:4000/sitemap.xml`
   - Should see XML content with `<url>` entries
   - Browser should allow you to view the XML in formatted view

### Method 2: Check Headers

**In browser DevTools Network tab:**

1. Open DevTools (F12)
2. Go to Network tab
3. Visit `/robots.txt`
4. Check Response Headers:
   - Should see: `Content-Type: text/plain`
   - Should see: `Cache-Control: public, max-age=3600`

5. Visit `/sitemap.xml`
6. Check Response Headers:
   - Should see: `Content-Type: text/xml`

### Method 3: Google Search Console (When Deployed)

**After deploying to production:**

1. Go to Google Search Console: https://search.google.com/search-console
2. Add your property/domain if not already added
3. Go to **Sitemaps** (left sidebar)
4. Click **Add/Test Sitemap**
5. Enter: `https://northvalleytyres.com/sitemap.xml`
6. Google will parse and show:
   - Number of URLs found
   - Any errors in XML format
   - Last fetch time

**Expected result:**
- ✓ Sitemap successfully submitted
- ✓ All URLs indexed (or pending indexing)
- ✓ No XML parsing errors

### Method 4: Online Sitemap Validators

**Free validators to check sitemap structure:**

1. **XML Sitemap Validator**: https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Enter your sitemap URL
   - Will report any XML syntax errors

2. **Google Structured Data Test**: https://search.google.com/test/rich-results
   - Enter your domain
   - Can detect sitemap references

3. **Robots.txt Checker**: https://www.seobility.net/en/seocheck/check-robots-txt/
   - Enter your domain
   - Will validate robots.txt format

### Method 5: Search Engine Bot Simulation

**Using curl commands to test:**

```bash
# Test robots.txt response
curl -i http://localhost:4000/robots.txt

# Test sitemap.xml response
curl -i http://localhost:4000/sitemap.xml

# Should show 200 OK status
```

### Method 6: Verify File Locations

**Files should exist at:**

```
project-root/
├── public/
│   ├── robots.txt ✓
│   └── sitemap.xml ✓
├── src/
│   ├── server.ts (with /robots.txt and /sitemap.xml endpoints) ✓
│   └── index.html (with sitemap link) ✓
```

### Method 7: Check Sitemaps in HTML

**Verify sitemap link in page source:**

1. Right-click on page → "View Page Source"
2. Search for: `sitemap`
3. Should find:
   ```html
   <link rel="sitemap" type="application/xml" href="https://northvalleytyres.com/sitemap.xml">
   ```

---

## Sitemap URLs Included

Your sitemap includes all key pages with proper priorities:

| Route | Priority | Change Frequency | Purpose |
|-------|----------|------------------|---------|
| `/` (Home) | 1.0 | Daily | Primary entry point |
| `/tyres` | 0.9 | Weekly | Main product page |
| `/new-tyre` | 0.9 | Weekly | Featured product |
| `/about-us` | 0.8 | Monthly | Company info |
| `/contact-us` | 0.8 | Monthly | Conversion page |
| Services pages | 0.7 | Monthly | Service offerings |
| Events | 0.6 | Weekly | Time-sensitive |
| Galleries | 0.5 | Monthly | Media content |

---

## Expected Results Checklist

- [ ] `/robots.txt` returns 200 OK with text/plain content type
- [ ] `/sitemap.xml` returns 200 OK with text/xml content type
- [ ] robots.txt contains disallow rules and sitemap reference
- [ ] sitemap.xml has valid XML structure (all URLs properly formatted)
- [ ] Sitemap includes all main routes with proper priorities
- [ ] Sitemap link is present in page source
- [ ] No 404 errors when accessing robots.txt/sitemap.xml
- [ ] Cache headers are set appropriately

---

## Dynamic Sitemap Feature

For future enhancement (when you have dynamic content):

The `SitemapService` (src/app/services/sitemap.service.ts) can generate sitemaps dynamically:

```typescript
// Usage example:
import { SitemapService } from './services/sitemap.service';

export class SomeComponent {
  constructor(private sitemapService: SitemapService) {}

  generateSitemap() {
    const urls = this.sitemapService.getStaticUrls();
    const xmlContent = this.sitemapService.generateSitemap(urls);
    // Send to server/save to file
  }
}
```

---

## Robots.txt Rules Explained

**Current configuration:**

```
User-agent: *          # Applies to all crawlers
Allow: /               # Allow crawling of root
Disallow: /admin       # Hide admin pages
Disallow: /api         # Hide API endpoints

Crawl-delay: 0.5       # Don't hammer server (0.5 second delay)

Sitemap: ...           # Reference to sitemap location
Host: ...              # Preferred domain (prevents www/non-www duplication)
```

---

## Troubleshooting

**Q: Getting 404 for robots.txt/sitemap.xml?**
A: 
1. Ensure you built the project: `npm run build`
2. Check that static files are being served correctly
3. Verify the Express server is running on the right port
4. Dynamic endpoints in server.ts might not be working; fallback files in /public are there

**Q: Sitemap shows old dates?**
A: 
1. Update the `lastmod` dates in `/public/sitemap.xml`
2. Or ensure dynamic generation is working from `src/server.ts`
3. Date updates on every build using `new Date().toISOString()`

**Q: Google Search Console says "No candidate URLs"?**
A:
1. Sitemap might have XML syntax errors
2. Validate using XML Sitemap Validator
3. Wait 24-48 hours for Google to crawl
4. Submit sitemap again in GSC

**Q: robots.txt Disallow rules affecting good pages?**
A:
1. Only `/admin` and `/api` are disallowed currently
2. If you're hiding legitimate pages, remove from Disallow
3. Remember: robots.txt is a suggestion for respectful crawlers

---

## Next Steps

✅ Continue to **Step 4: Configure Canonical URLs** after verifying sitemap and robots.txt are accessible.

**Production deployment note:** Update domain URLs from `localhost:4000` to your actual domain before deploying.
