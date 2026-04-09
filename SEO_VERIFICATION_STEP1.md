# SEO Optimization Verification Guide - Step 1: Meta Tags

## How to Verify Meta Tags Are Working

### Method 1: Browser DevTools Inspection

1. **Open your Angular app** (`npm start` or production build)
2. **Open DevTools** (F12 or Right-Click → Inspect)
3. **Go to Elements/Inspector tab**
4. **Check the <head> section** for these tags:

```html
<!-- Should see these meta tags -->
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:image" content="...">
<link rel="canonical" href="...">
```

**Testing on Different Routes:**
- Navigate to `/` (home) → should show "Premium Tyres & Car Services" title
- Navigate to `/about-us` → should show "About Us - Colne Tyre Centre" title
- Navigate to `/contact-us` → should show "Contact Us" title
- Check the browser title bar changes for each page

### Method 2: View Page Source (Server-Side Rendering Check)

1. **Right-Click on page** → "View Page Source"
2. **Search for `<meta name="description"`**
3. **Verify the meta tags are in the source** (this proves SSR is working)

**Why this matters:** Search engine crawlers see the page source, not the rendered DOM. 
If meta tags only appear in the rendered DOM (not in source), crawlers won't see them.

With your SSR setup, the meta tags should be visible in the page source, which is perfect for SEO!

### Method 3: Social Media Sharing Preview

1. **Test Open Graph tags** using Meta's Open Graph Debugger:
   - Visit: https://developers.facebook.com/tools/debug/
   - Enter your site URL (when deployed)
   - Should show title, description, and image preview

2. **Test Twitter Cards** using Twitter Card Validator:
   - Visit: https://cards-dev.twitter.com/validator
   - Enter your site URL
   - Should show formatted card preview

### Method 4: SEO Inspection Tools

**Using free tool - SEO Minion (Chrome Extension):**
1. Install "SEO Minion" from Chrome Web Store
2. Click the extension icon → "Analyze on-page SEO"
3. Check under "Meta Information" section

**Using free tool - Lighthouse (Built-in Chrome DevTools):**
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Select "SEO" from the categories
4. Click "Analyze page load"
5. Look for meta tag issues in the results

### Method 5: Verify Dynamic Meta Updates

**For each page route, verify the title and description change:**

```typescript
// Test in browser console:
document.title  // Should show page-specific title
document.querySelector('meta[name="description"]').content  // Should show page description
```

### Expected Results Checklist

- [ ] `<title>` changes per page ✓
- [ ] `<meta name="description">` changes per page ✓
- [ ] `<meta name="canonical">` is set and correct ✓
- [ ] Open Graph tags (og:title, og:description, og:image) are present ✓
- [ ] Twitter Card tags (twitter:card, twitter:title, twitter:image) are present ✓
- [ ] Meta tags visible in page source (proves SSR working) ✓
- [ ] No console errors related to MetaService ✓

---

## Next Steps

If all verifications pass, you're ready for **Step 2: JSON-LD Structured Data**

If meta tags aren't changing:
1. Check browser console for errors (F12 → Console tab)
2. Verify MetaService is injected in your page components
3. Ensure components implement OnInit and call this.metaService.updateMetaTags()
4. Clear browser cache (Ctrl+Shift+Delete)
