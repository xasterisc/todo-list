import DOMPurify from 'dompurify';

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return;

  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ADD_ATTR: [],
  });
};

export { sanitizeInput };
