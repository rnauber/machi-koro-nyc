export function radioTowerEffect(player) {
    return {
        player: {
            ...player,
            rollsAllowedPerTurn: 2,
        },
    };
}

export function amusementParkEffect(player) {
    const extraTurnWhen = player.extraTurnWhen ?
        [...player.extraTurnWhen, 'doubles'] :
        ['doubles'];

    return {
        player: {
            ...player,
            extraTurnWhen
        },
    };
}

export function shoppingMallEffect(player) {
    const addedBonuses = {
        [ESTABLISHMENT_TYPES.COFFEE]: 1,
        [ESTABLISHMENT_TYPES.GOODS]: 1,
    };

    if (player.bonuses) {
        Object.keys(player.bonuses).forEach((k) => {
            addedBonuses[k] = player.bonuses[k] + (addedBonuses[k] || 0);
        });
    }

    return {
        player: {
            ...player,
            bonuses: addedBonuses,
        },
    };
}

export function trainStationEffect(player) {
    return {
        player: {
            ...player,
            diceAvailable: 2,
        },
    };
}

export const establishments = [

	{

		title: 'Wheat Field (Halal Cart)',
    id: 1,
		subtitle: "Get 1 coin from the bank, on anyone's turn.",
    type: 'Wheat Field',
		count: 6,
		cost: 1,
		active: [1],
		spawn: 1,
		// priority: CARD_PRIORITIES.BLUE,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 1,
		// 		source: SOURCES.BANK,
		// 	},
		// ],
	},
	{
		title: 'Ranch (Pizzeria)',
    id: 2,
		subtitle: "Get 1 coin from the bank, on anyone's turn.",
    type: 'Ranch',
		count: 6,
		cost: 1,
		active: [2],
		spawn: 0,
		// priority: CARD_PRIORITIES.BLUE,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 1,
		// 		source: SOURCES.BANK,
		// 	},
		// ],
	},
	{
		title: 'Bakery (Corner Bodega)',
    id: 3,
		subtitle: 'Get 1 coin from the bank, on your turn only.',
    type: 'Bakery',
		count: 6,
		cost: 1,
		active: [2, 3],
		spawn: 1,
		// priority: CARD_PRIORITIES.GREEN,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 1,
		// 		source: SOURCES.BANK,
		// 	},
		// ],
	},
	{
		title: 'Café (Dive Bar)',
    id: 4,
		subtitle: 'Get 1 coin from the player who rolled the dice.',
    type: 'Cafe',
		count: 6,
		cost: 2,
		active: [3],
		spawn: 0,
		// priority: CARD_PRIORITIES.RED,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 1,
		// 		source: SOURCES.ROLLER,
		// 	},
		// ],
	},
	{
		title: 'Convenience Store (Duane Reade)',
    id: 5,
		subtitle: 'Get 3 coins from the bank, on your turn only.',
    type: 'Convenience Store',
		count: 6,
		cost: 2,
		active: [4],
		spawn: 0,
		// priority: CARD_PRIORITIES.GREEN,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 3,
		// 		source: SOURCES.BANK,
		// 	},
		// ],
	},
	{
		title: 'Forest (Studio Apartment)',
    id: 6,
		subtitle: "Get 1 coin from the bank, on anyone's turn.",
    type: 'Forest',
		count: 6,
		cost: 3,
		active: [5],
		spawn: 0,
		// priority: CARD_PRIORITIES.BLUE,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 1,
		// 		source: SOURCES.BANK,
		// 	},
		// ],
	},
	{
		title: 'Business Center (Leasing Office)',
    id: 7,
		subtitle: 'Trade one non-TOWER establishment with another player, on your turn only.',
    type: 'Business Center',
		count: 4,
		cost: 8,
		active: [6],
		spawn: 0,
		// priority: CARD_PRIORITIES.PURPLE,
		// actions: [
		// 	{
		// 		type: ACTIONS.TRADE,
		// 		count: 1,
		// 		source: SOURCES.CHOICE,
		// 	},
		// ],
	},
	{
		title: 'Stadium (New Venture)',
    id: 8,
		subtitle: 'Get 2 coins from all players, on your turn only.',
    type: 'Stadium',
		count: 4,
		cost: 6,
		active: [6],
		spawn: 0,
		// priority: CARD_PRIORITIES.PURPLE,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 2,
		// 		source: SOURCES.ALL,
		// 	},
		// ],
	},
	{
		title: 'TV Station (Hedge Fund)',
    id: 9,
		subtitle: 'Take 5 coins from any one player, on your turn only.',
    type: 'TV Station',
		count: 4,
		cost: 7,
		active: [6],
		spawn: 0,
		// priority: CARD_PRIORITIES.PURPLE,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 5,
		// 		source: SOURCES.CHOICE,
		// 	},
		// ],
	},
	{
		title: 'Cheese Factory (5-Star Restaurant)',
    id: 10,
		subtitle: 'Get 3 coins from the bank for each CATTLE establishment that you own, on your turn only.',
    type: 'Cheese Factory',
		count: 6,
		cost: 5,
		active: [7],
		spawn: 0,
		// priority: CARD_PRIORITIES.GREEN,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 3,
		// 		source: SOURCES.BANK,
		// 		multiplier: ESTABLISHMENT_TYPES.CATTLE,
		// 	},
		// ],
	},
	{
		title: 'Furniture Factory (Apartment Building)',
    id: 11,
		subtitle: 'Get 3 coins from the bank for each FACTORY establishment that you own, on your turn only.',
    type: 'Furniture Factory',
		count: 6,
		cost: 3,
		active: [8],
		spawn: 0,
		// priority: CARD_PRIORITIES.GREEN,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 3,
		// 		source: SOURCES.BANK,
		// 		multiplier: ESTABLISHMENT_TYPES.FACTORY,
		// 	},
		// ],
	},
	{
		title: 'Mine (Brownstone Apartment)',
    id: 12,
		subtitle: "Get 5 coins from the bank, on anyone's turn.",
    type: 'Mine',
		count: 6,
		cost: 6,
		active: [9],
		spawn: 0,
		// priority: CARD_PRIORITIES.BLUE,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 5,
		// 		source: SOURCES.BANK,
		// 	},
		// ],
	},
	{
		title: 'Family Restaurant (Nightclub)',
    id: 13,
		subtitle: 'Get 2 coins from the player who rolled the dice.',
    type: 'Family Restaurant',
		count: 6,
		cost: 3,
		active: [9, 10],
		spawn: 0,
		// priority: CARD_PRIORITIES.RED,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 2,
		// 		source: SOURCES.ROLLER,
		// 	},
		// ],
	},
	{
		title: 'Apple Orchard (Metro Stop)',
    id: 14,
		subtitle: "Get 3 coins from the bank, on anyone's turn.",
    type: 'Apple Orchard',
		count: 6,
		cost: 3,
		active: [10],
		spawn: 0,
		// priority: CARD_PRIORITIES.BLUE,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 3,
		// 		source: SOURCES.BANK,
		// 	},
		// ],
	},
	{
		title: 'Fruit and Vegetable Market (Whole Foods)',
    id: 15,
		subtitle: 'Get 2 coins from the bank for each GRAIN establishment that you own, on your turn only.',
    type: 'Fruit and Vegetable Market',
		count: 6,
		cost: 2,
		active: [11, 12],
		spawn: 0,
		// priority: CARD_PRIORITIES.GREEN,
		// actions: [
		// 	{
		// 		type: ACTIONS.INCOME,
		// 		count: 2,
		// 		source: SOURCES.BANK,
		// 		multiplier: ESTABLISHMENT_TYPES.GRAIN,
		// 	},
		// ],
	},

];
export const landmarks = [
    {
        title: 'Train Station (Penn Station)',
        subtitle: 'You may roll 1 or 2 dice.',
        cost: 4,
        effect: 'trainStationEffect',
        built: false,
    },
    {
        title: 'Shopping Mall (Times Square)',
        subtitle: 'Each of your COFFEE and GOODS establishments earn +1 coin.',
        cost: 10,
        effect: 'shoppingMallEffect',
        built: false,
    },
    {
        title: 'Amusement Park (Central Park)',
        subtitle: 'If you roll doubles, take another turn after this one.',
        cost: 16,
        effect: 'amusementParkEffect',
        built: false,
    },
    {
        title: 'Radio Tower (Freedom Tower)',
        subtitle: 'Once every turn, you can choose to re-roll your dice.',
        cost: 22,
        effect: 'radioTowerEffect',
        built: false,
    },
];

import assert from 'assert';
import uuid from 'node-uuid';



const generateId = uuid.v4;

export function createGame(name = 'Unnamed Game') {
    const establishments = [];

    // this is absolutely incapable of handling the
    // market scheme introduced in the harbor exp.
    //
    // oh 🐳
    baseGame.establishments.forEach((es) => {
        for (let i = 0; i < es.count; i++) {
            establishments.push({
                ...es,
                id: generateId(),
                count: undefined,
            });
        }
    });

    return {
        name,
        establishments,
        id: generateId(),
        bank: Infinity,
        players: [],
        maxPlayers: 4,
    };
}

export function createPlayer(name = 'Unnamed Player') {
    return {
        name,
        id: generateId(),
        money: 0,
        extraTurnWhen: [],
        rollsAllowedPerTurn: 1,

        establishments: baseGame.establishments
            .filter((es) => es.spawn)
            .map((es) => ({
                ...es,
                id: generateId(),
            })),

        landmarks: baseGame.landmarks.map((lm) => ({
            ...lm,
            id: generateId(),
            purchased: false,
        })),
    };
}

export function addPlayerToGame(game, player) {
    if (game.players.length === game.maxPlayers) {
        throw new Error('Game is full');
    }

    return {
        ...game,
        players: [
            ...game.players,
            player,
        ],
    };
}

export function findPlayer(game, playerId) {
    const players = game.players.filter(p => p.id === playerId);

    if (!players.length) {
        return null;
    }

    return players[0];
}

export function setMoney(game, playerId, money) {
    const player = findPlayer(game, playerId);

    if (!player) {
        throw new Error('Player not in game');
    }

    return {
        ...game,
        players: [
            ...game.players.filter(p => p.id !== playerId),
            {
                ...player,
                money,
            },
        ],
    };
}

export function findMarketEstablishment(game, establishmentId) {
    const establishments = game.establishments.filter(e => e.id === establishmentId);

    if (!establishments.length) {
        return null;
    }

    return establishments[0];
}

export function purchaseEstablishment(game, {playerId, establishmentId}) {
    const player = findPlayer(game, playerId);
    const establishment = findMarketEstablishment(game, establishmentId);

    if (!player) {
        throw new Error('Player not in game');
    }

    if (!establishment) {
        throw new Error('Establishment not available for purchase');
    }

    if (player.money < establishment.cost) {
        throw new Error('Player cannot afford establishment');
    }

    const updatedPlayer = {
        ...player,
        money: player.money - establishment.cost,
        establishments: [
            ...player.establishments,
            establishment,
        ],
    };

    return {
        ...game,
        bank: game.bank + establishment.cost,
        establishments: game.establishments.filter(e => e.id !== establishmentId),
        players: [
            ...game.players.filter(p => p.id !== playerId),
            updatedPlayer,
        ],
    };
}

export default function app() {
}
