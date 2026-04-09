# SEO Optimization Verification Guide - Step 4: Canonical URLs

## How to Verify Canonical URLs Are Set Correctly

### Method 1: Browser DevTools Head Inspector

1. **Open your Angular app**
2. **Right-click** → "Inspect" or press F12
3. **Look for `<link rel="canonical">`** in the `<head>` section
4. **You should see:**
   ```html
   <link rel="canonical" href="https://northvalleytyres.com/about-us">
   ```

### Method 2: View Page Source (Critical for SSR!)

1. **Right-click on page** → "View Page Source"
2. **Ctrl+F** search for `rel="canonical"`
3. **Verify it's present in the HTML source** (not just rendered DOM)

**This is CRITICAL for SEO:**
- Crawlers read page source, not rendered DOM
- With SSR, canonical tags should be in the source

### Method 3: Test on Each Route

Visit each page and verify the canonical URL matches:

| Route | Expected Canonical |
|-------|-------------------|
| `/` | `https://northvalleytyres.com/` |
| `/about-us` | `https://northvalleytyres.com/about-us` |
| `/contact-us` | `https://northvalleytyres.com/contact-us` |
| `/tyres` | `https://northvalleytyres.com/tyres` |
| `/adas` | `https://northvalleytyres.com/adas` |
| `/valeting` | `https://northvalleytyres.com/valeting` |

**Test for edge cases:**
- Visit `/about-us/` (with trailing slash) → canonical should still be `/about-us` (without slash)
- Visit `/About-Us` (different case) → canonical should be `/about-us` (lowercase)

### Method 4: Browser Console Test

**Open browser console (F12 → Console tab) and test:**

```javascript
// Check current canonical URL
const canonical = document.querySelector('link[rel="canonical"]');
console.log('Canonical URL:', canonical?.href);

// Check if it matches current page
console.log('Current URL:', window.location.href);
console.log('Match:', canonical?.href === window.location.href);
```

**Expected output:**
- Canonical URL matches current page URL (normalized)
- Same canonical on all route variations

### Method 5: Open Graph URL Test

**Verify OG tags also use canonical URL:**

```javascript
// Check Open Graph URL tag
const ogUrl = document.querySelector('meta[property="og:url"]');
console.log('OG URL:', ogUrl?.content);

// Should match canonical URL
const canonical = document.querySelector('link[rel="canonical"]');
console.log('Canonical URL:', canonical?.href);
console.log('OG matches canonical:', ogUrl?.content === canonical?.href);
```

### Method 6: Search Engine Tools

**Once deployed, test with Google tools:**

**Google Search Console:**
1. Go to: https://search.google.com/search-console
2. Add your domain property
3. Click "Inspect URL" 
4. Enter different variations:
   - `https://northvalleytyres.com/about-us`
   - `https://northvalleytyres.com/about-us/` (with slash)
5. Google should report they point to same canonical page

**Chrome DevTools Lighthouse:**
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "SEO" category
4. Click "Analyze page load"
5. Should pass "Document has a valid rel=canonical"

### Method 7: Duplicate Content Test

**Test that different URLs point to same canonical:**

```bash
# Using curl to check headers
curl -I https://northvalleytyres.com/about-us
curl -I https://northvalleytyres.com/about-us/

# Both should render page with same canonical URL in source
```

---

## Canonical URL Normalization Explained

Your canonical URL implementation handles:

✓ **Trailing slashes**: `/about-us/` → `/about-us` (except root)
✓ **Case sensitivity**: `/About-Us` → `/about-us`
✓ **Query parameters**: `/page?id=1` → `/page` (removed)
✓ **URL fragments**: `/page#section` → `/page` (removed)
✓ **Protocol consistency**: Always `https://`
✓ **Domain consistency**: Always `northvalleytyres.com` (no www)

---

## Common Canonical URL Issues & Solutions

### Issue 1: Canonical URL Not in Page Source
**Problem:** Canonical only appears in rendered DOM, not page source
**Solution:** 
- Ensure MetaService runs in ngOnInit (not later)
- With SSR, canonical should be set early in lifecycle
- Check for console errors preventing execution

### Issue 2: Canonical URL Doesn't Match Current Page
**Problem:** Page shows `/page` but canonical says `/page/`
**Solution:**
- Check normalization logic in MetaService
- Ensure trailing slashes are consistently handled
- Test with different route variations

### Issue 3: Parameters in Canonical URL
**Problem:** Canonical shows `/page?id=1` instead of just `/page`
**Solution:**
- Query parameters should be removed by normalization
- Check if `normalizeUrl()` is stripping query params properly

### Issue 4: Wrong Domain in Canonical
**Problem:** Canonical shows `localhost:4000` or wrong domain
**Solution:**
- Update `baseUrl` in MetaService
- Change: `private baseUrl = 'https://northvalleytyres.com';`
- Never include port numbers in production canonical

### Issue 5: Mixed HTTP/HTTPS
**Problem:** Some pages use http, others https
**Solution:**
- Always use `https://` in canonical
- Ensure app redirects http to https
- Configuration in MetaService: `private baseUrl = 'https://northvalleytyres.com';`

---

## Best Practices Implemented

✓ **Every page has a canonical URL** - Prevents duplicate content penalties
✓ **Canonical references itself** - Homepage canonical is homepage URL
✓ **Normalized URLs** - Consistent handling of slashes, case, params
✓ **SSR-friendly** - Canonical in page source, not just DOM
✓ **Matches OG tags** - Consistency across all metadata
✓ **Production-ready** - Uses full domain, not localhost

---

## Dynamic Routes Note

For dynamic/parameterized routes (e.g., `/product/[id]`), ensure:

1. **Pass `url` parameter to MetaService:**
   ```typescript
   this.metaService.updateMetaTags({
     title: productName,
     url: `/product/${productId}`, // Ensure this is passed
     // ... other fields
   });
   ```

2. **Each product gets unique canonical:**
   - `/product/tire-123` has its own canonical
   - Not sharing canonical with other products

---

## Expected Results Checklist

- [ ] Canonical URL visible in page source (not just DOM)
- [ ] Every page has exactly one canonical URL
- [ ] Canonical matches current page URL (normalized)
- [ ] Trailing slashes handled consistently
- [ ] Case normalized (lowercase)
- [ ] Query parameters removed
- [ ] Only `https://` URLs (no http)
- [ ] Domain is always `northvalleytyres.com` (no www, no localhost)
- [ ] OG:url matches canonical URL
- [ ] Works on all routes (home, about, services, etc.)
- [ ] Google Search Console recognizes canonical URLs
- [ ] No URL duplication warnings in SEO tools

---

## Troubleshooting Test

**Run this in browser console to diagnose issues:**

```javascript
// Complete canonical URL diagnostic
const canonical = document.querySelector('link[rel="canonical"]');
const ogUrl = document.querySelector('meta[property="og:url"]');
const currentUrl = window.location.href;

console.log('=== CANONICAL URL DIAGNOSTICS ===');
console.log('Canonical exists:', !!canonical);
console.log('Canonical URL:', canonical?.href);
console.log('OG:url exists:', !!ogUrl);
console.log('OG:url content:', ogUrl?.content);
console.log('Current URL:', currentUrl);
console.log('Canonical matches current:', canonical?.href === currentUrl);
console.log('OG matches canonical:', ogUrl?.content === canonical?.href);

if (!canonical) console.error('❌ No canonical tag found!');
if (!ogUrl) console.error('❌ No OG:url tag found!');
if (canonical?.href !== ogUrl?.content) console.error('❌ OG:url doesn\'t match canonical!');
if (canonical?.href === currentUrl) console.log('✅ All checks passed!');
```

---

## Next Steps

✅ Continue to **Step 5: Optimize Images and Lazy Loading** to improve page performance and Core Web Vitals.
