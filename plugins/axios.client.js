export default function({ $axios }) {
  if (process.client && process.env.NODE_ENV === 'production') {
    const host = window.location.hostname;
    $axios.setBaseURL("http://" + host + ":80");
  }
}