const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            match: [/^[a-zA-Z]{1,280}$/, 'Thought must be between 1 and 280 characters.']
        },
        createdAt: {
            type: Date,
            default: Date.now().toLocaleString(),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(() => this.reactions.length);

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;