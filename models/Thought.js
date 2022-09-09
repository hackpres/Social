const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            match: [/^.{1,280}$/, 'Reaction must be between 1 and 280 characters.']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: String,
            default: dateFormat(new Date()),
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            match: [/^.{1,280}$/, 'Thought must be between 1 and 280 characters.']
        },
        createdAt: {
            type: String,
            default: dateFormat(new Date()),
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

ThoughtSchema.virtual('reactionCount').get(function () {
    return  this.reactions.length
});

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;