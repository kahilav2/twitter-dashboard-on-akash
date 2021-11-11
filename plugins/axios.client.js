export default function({ $axios }) {
  if (process.client && process.env.NODE_ENV === 'production') {
    const host = window.location.hostname;
    console.error("MOI", host);
    $axios.setBaseURL("http://" + host + ":80");
  }
}