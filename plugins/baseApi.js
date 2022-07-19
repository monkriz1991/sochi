export default function ({ $axios, $config: { API_TOKEN, API_BASE_URL} }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    timeout: 10000,
  })

  // Set baseURL to something different
  api.setBaseURL(API_BASE_URL,)

  // Inject to context as $api
  inject('baseApi', api)
}
