# SEO Optimization Verification Guide - Step 2: JSON-LD Structured Data

## How to Verify Structured Data Is Properly Configured

### Method 1: Browser DevTools Inspection

1. **Open your Angular app**
2. **Open DevTools** (F12)
3. **Go to Elements/Inspector tab**
4. **Search for `<script type="application/ld+json">`**
5. **You should see multiple script tags with JSON data**

Expected format:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "North Valley Tyres",
  ...
}
</script>
```

### Method 2: Google's Rich Results Test (RECOMMENDED)

**Best way to verify structured data for SEO:**

1. Visit: https://search.google.com/test/rich-results
2. Enter your website URL (when deployed)
3. Click "Test URL"
4. Wait for results
5. **Verify that it detects:**
   - Organization schema ✓
   - LocalBusiness schema ✓
   - BreadcrumbList schema ✓
6. Check for any errors/warnings

**Why this matters:** Google uses this exact tool to evaluate your site for Rich Snippets in search results.

### Method 3: Schema.org Validator

1. Visit: https://validator.schema.org/
2. Enter your website URL
3. Click "Validate"
4. Review the parsed data structure
5. Should see all your schemas properly formatted

### Method 4: Microdata Inspector Browser Extension

1. Install "Microdata Inspector" or "Structured Data Testing Tool" from Chrome Web Store
2. Navigate to your website
3. Click the extension icon
4. Should display all structured data found on the page

### Method 5: JSON-LD View in Browser Console

**Test in browser console (F12 → Console tab):**

```javascript
// Find all JSON-LD scripts
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
console.log(`Found ${scripts.length} JSON-LD schemas`);

// Log each schema
scripts.forEach((script, index) => {
  console.log(`Schema ${index + 1}:`, JSON.parse(script.textContent));
});
```

### Method 6: Verify Page Source (SSR Check)

1. **Left-click on page** → "View Page Source"
2. **Search for `application/ld+json`**
3. **Should see JSON-LD schemas in the source** (proves SSR is rendering them)
4. This is critical for SEO - crawlers need to see the structured data in page source

### Testing Each Schema Type

#### Organization Schema
✓ Should include: name, url, logo, description, contact information
✓ Test pages: All pages (added to reusable schema)

#### LocalBusiness Schema  
✓ Should include: address, phone, email, opening hours, coordinates
✓ Test pages: Home, About Us, Contact Us
⚠️ **TODO:** Update with real business information:
   - Phone number
   - Address
   - Postal code
   - Coordinates
   - Opening hours
   - Social media links

#### BreadcrumbList Schema
✓ Should show navigation hierarchy
✓ Structure: Home → About Us → Page Name
✓ Test by navigating to different pages

#### Service Schema (to be added)
✓ For pages like /tyres, /valeting, /adas
✓ Should include: service name, description, provider

#### Product Schema (to be added)
✓ For individual tyre/product listings
✓ Should include: name, price, availability, ratings

---

## Expected Results Checklist

- [ ] Multiple `<script type="application/ld+json">` tags visible in page source
- [ ] Organization schema present with business information
- [ ] LocalBusiness schema present with location details
- [ ] BreadcrumbList schema shows page hierarchy
- [ ] Schemas valid according to Schema.org validation
- [ ] Google's Rich Results Test shows no errors
- [ ] Structured data visible in SSR-rendered page source (critical!)
- [ ] No duplicate schemas causing conflicts

---

## Important Configuration Updates Needed

Before full deployment, update the schema data in `src/app/services/schema.service.ts`:

```typescript
// Lines to update:
'telephone': '+44-1282-123456', // Your actual phone
'email': 'info@northvalleytyres.com', // Your actual email
'streetAddress': 'Your Street Address',
'addressLocality': 'Colne',
'addressRegion': 'Lancashire',
'postalCode': 'BB8 1AA',
'latitude': '53.8565', // Your actual coordinates
'longitude': '-2.0787',
// Add opening hours
// Add social media links
// Add logo image
```

---

## Troubleshooting

**Q: No JSON-LD scripts appear in page source?**
A: 
1. Check that SchemaService is properly injected in your components
2. Ensure ngOnInit is calling schemaService.addSchema()
3. Verify components are being loaded (check console for errors)
4. Clear browser cache and reload

**Q: Google Rich Results Test shows errors?**
A:
1. Check the error details in the Tool
2. Most common: required fields missing from schema
3. Fix the data in schema.service.ts
4. Re-test after fixing

**Q: Schemas visible in rendered DOM but not in source?**
A:
1. This means SSR is not properly rendering them
2. Ensure SchemaService uses @Inject(DOCUMENT)
3. Scripts should be added in ngOnInit (before page renders)

---

## Next Steps

✅ Continue to **Step 3: Creating Sitemap.xml and Robots.txt** after verifying structured data is working.

