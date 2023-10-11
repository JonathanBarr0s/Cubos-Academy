const instanciaAxios = require('../axios')
const fs = require('fs/promises')

const detalharEmpresa = async (req, res) => {
	const { dominioEmpresa } = req.query

	try {
		const { data: empresa } = await instanciaAxios.get(
			`/?domain=${dominioEmpresa}`
		)

		if (empresa && empresa.name) {
			const dadosEmpresas = JSON.parse(
				await fs.readFile('./src/dados/empresas.json')
			)

			dadosEmpresas.push(empresa)

			await fs.writeFile(
				'./src/dados/empresas.json',
				JSON.stringify(dadosEmpresas, null, 2)
			)
		}

		return res.json(empresa)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ mensagem: 'Erro interno do servidor' })
	}
}

module.exports = {
	detalharEmpresa,
}
