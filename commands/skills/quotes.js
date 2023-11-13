const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

// Read the data from the JSON file
const rawData = fs.readFileSync('data.json');
const data = JSON.parse(rawData);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('Get a random quotes from P5 characters')
        .addStringOption(option =>
            option
                .setName('character')
                .setDescription('Select the character')
                .setRequired(true)
                .addChoices(
                    { name: 'Morgana', value: 'morgana' },
                    { name: 'Ryuji', value: 'ryuji' },
                    { name: 'Futaba', value: 'futaba' },
                )
        ),         

    async execute(interaction) {
        const character = interaction.options.getString('character');
        const characterQuotes = data[character];

        if (characterQuotes) {
            // Select a random quote image path for the specified character
            const randomQuotePath =
                characterQuotes[Math.floor(Math.random() * characterQuotes.length)];

            // Send the random quote image as a response
            await interaction.reply({
                files: [
                    {
                        attachment: randomQuotePath,
                        name: `${character}Quote.png`,
                    },
                ],
            });
        } else {
            await interaction.reply('Invalid character.');
        }
    },
};
