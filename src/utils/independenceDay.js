// INDEPENDENCE DAY THEME — ACTIVE: AUG 15 ONLY

export function isIndependenceDay() {
  const now = new Date();
  
  // Use Intl.DateTimeFormat to force timezone to Asia/Kolkata
  const options = { timeZone: 'Asia/Kolkata', month: 'numeric', day: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  
  const parts = formatter.formatToParts(now);
  let month = 0;
  let day = 0;
  
  parts.forEach(part => {
    if (part.type === 'month') month = parseInt(part.value, 10);
    if (part.type === 'day') day = parseInt(part.value, 10);
  });
  
  // Month is 1-indexed in Intl (August = 8)
  return month === 8 && day === 15;
}
