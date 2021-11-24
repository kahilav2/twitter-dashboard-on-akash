export default function({ $axios }) {
  if (process.client && process.env.NODE_ENV === 'production') {
    const host = window.location.hostname;
    const [protocol, port] = process.env.usesHTTPS ? ['https://', '443'] : ['http://', '80'];
    $axios.setBaseURL(`${protocol}${host}:${port}`);
  }
}