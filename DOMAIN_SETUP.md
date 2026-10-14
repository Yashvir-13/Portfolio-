# Custom `.me` Domain Setup Guide
**GitHub Student Developer Pack → Namecheap → Vercel & Living Archive**

---

## 1. Claiming your Free `.me` Domain
Through the **GitHub Student Developer Pack**, Namecheap provides a free 1-year `.me` domain registration:

1. Navigate to [GitHub Student Developer Pack](https://education.github.com/pack).
2. Locate the **Namecheap** offer and click **Get access by connecting your GitHub account on Namecheap**.
3. Search for your domain: `yashvirafterhours.me`.
4. Complete the checkout (the promo code automatically discounts the 1-year registration to $0.00).

---

## 2. Linking `yashvirafterhours.me` to Vercel

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Select your **Portfolio / Living Archive** project.
3. Go to **Settings** → **Domains**.
4. Enter your custom domain:
   - Enter `yashvirafterhours.me` and click **Add**.
   - Select the recommended option: *"Redirect `yashvirafterhours.me` to `www.yashvirafterhours.me`"* (or serve both directly).
5. Vercel will generate the DNS verification values:
   - **Apex Domain (`@`)**: Type `A`, Value `76.76.21.21`
   - **Subdomain (`www`)**: Type `CNAME`, Value `cname.vercel-dns.com`

---

## 3. Configuring DNS in Namecheap

1. Log in to [Namecheap](https://www.namecheap.com/) and go to **Dashboard** → **Domain List**.
2. Click **Manage** next to `yashvirafterhours.me`.
3. Select the **Advanced DNS** tab.
4. Under **Host Records**, click **Add New Record**:

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **CNAME Record** | `www` | `cname.vercel-dns.com.` | Automatic |

5. Remove any default parking page records (e.g. `URL Redirect Record` or `Parking Page A Record`).
6. Click **Save all changes**.

*DNS propagation typically takes 5–30 minutes.* Once verified, Vercel will automatically generate and install a free SSL certificate (Let's Encrypt).

---

## 4. Codebase Environment Configuration

We have configured `metadataBase` in `app/layout.js` to default to `https://yashvirafterhours.me`:

```javascript
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yashvirafterhours.me'),
```

### Adding to Vercel Environment Variables:
1. In Vercel Project Settings → **Environment Variables**.
2. Add:
   - **Key:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://yashvirafterhours.me`
3. Redeploy or push to apply. OpenGraph previews, canonical links, and social cards will now automatically resolve to `https://yashvirafterhours.me`.
