<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>Sitemap · Osanix</title>
      <style>
        body{font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#14232e;background:#f4f7fa;margin:0;padding:32px 16px}
        .wrap{max-width:860px;margin:0 auto;background:#fff;border:1px solid #e5ecf1;border-radius:14px;padding:26px 28px;box-shadow:0 2px 6px rgba(20,35,46,.06)}
        h1{font-size:24px;margin:0 0 4px}
        p.sub{color:#4c5b66;margin:0 0 20px}
        .mk{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:7px;background:linear-gradient(135deg,#22557a,#164060);color:#fff;font-weight:900;font-size:13px;vertical-align:middle;margin-right:8px}
        .mk i{color:#ef5aa0;font-style:normal}
        table{width:100%;border-collapse:collapse;font-size:15px}
        th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #eff4f7}
        th{color:#7a8792;font-size:12px;text-transform:uppercase;letter-spacing:.08em}
        a{color:#164060;text-decoration:none}a:hover{text-decoration:underline}
        .c{color:#7a8792}
      </style>
    </head>
    <body>
      <div class="wrap">
        <h1><span class="mk">O<i>x</i></span> Osanix — XML Sitemap</h1>
        <p class="sub"><xsl:value-of select="count(s:urlset/s:url)"/> URLs. This page is for search engines; humans can browse from the <a href="/">homepage</a>.</p>
        <table>
          <tr><th>URL</th><th>Priority</th><th>Last modified</th></tr>
          <xsl:for-each select="s:urlset/s:url">
            <tr>
              <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
              <td class="c"><xsl:value-of select="s:priority"/></td>
              <td class="c"><xsl:value-of select="s:lastmod"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </div>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
