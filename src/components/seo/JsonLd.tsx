import type {JsonLdObject} from '@/lib/structured-data';

/**
 * Serialises JSON-LD safely for inline <script>. Escaping `<` (and the JS line
 * separators) prevents `</script>` or `<!--` in data from breaking out of the tag.
 */
export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/** Server component. Pass one object or an array (rendered as separate blocks). */
export function JsonLd({data}: {data: JsonLdObject | JsonLdObject[]}) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Safe: serializeJsonLd escapes <, >, & so the payload cannot close the tag.
          dangerouslySetInnerHTML={{__html: serializeJsonLd(item)}}
        />
      ))}
    </>
  );
}

export default JsonLd;
