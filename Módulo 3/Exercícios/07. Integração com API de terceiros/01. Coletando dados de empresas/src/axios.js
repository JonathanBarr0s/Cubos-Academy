const axios = require('axios')

const instanciaAxios = axios.create({
	baseURL: 'https://companyenrichment.abstractapi.com/v1',
	params: {
		api_key: '7858860e5eac4c54a9956b22a9ed0add',
	},
})

module.exports = instanciaAxios
