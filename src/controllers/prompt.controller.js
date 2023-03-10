const openai = require("../config/openai")
const InputPrompt = require("../model/input.model")
module.exports = {
    async sendText(request, response) {

        const openAI = openai.configuration()
        const inputModel = new InputPrompt(request.body)
        try {
            const response = await openAI.createCompletion(
                openai.textCompletion(inputModel)
            )
            return response.status(200).json(
                {
                    sucess:true,
                    data: response.data.choices[0].text
                }
            )

        } catch (error) {
             response.status(400).json({
                sucess:false,
                error: error.response ? error.response.data : "server error"
             })
        }
    }
}