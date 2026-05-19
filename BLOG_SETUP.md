# Blog Module — Supabase Setup

Run the following SQL in the Supabase SQL Editor
(Dashboard → SQL Editor → New Query):

```sql
CREATE TABLE blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  body text,
  cover_image text,
  category text,
  author text DEFAULT 'Polytrade Team',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
ON blogs FOR SELECT
USING (published = true);

CREATE POLICY "Authenticated users can do everything"
ON blogs FOR ALL
USING (auth.role() = 'authenticated');
```

## Admin Access

Create an admin user in Supabase:
Dashboard → Authentication → Users → Add User
Use email + password. This account is used to sign in at /admin.

## Routes

- /blog              Public blog listing
- /blog/[slug]       Individual post
- /admin             Admin login
- /admin/dashboard   Post management (auth required)
- /admin/posts/new   Create post (auth required)
- /admin/posts/[id]  Edit post (auth required)
