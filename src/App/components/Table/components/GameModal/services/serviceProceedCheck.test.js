require("@jest/globals");
import serviceProceedCheck from "./serviceProceedCheck";

// Resources
import emptyGame from "../resources/emptyGame.js";

describe("TEST OF SERVICE : serviceProceedCheck", () => {
  const validGame = {
    _id: "",
    table: "123",
    contract: "9plis",
    players: [
      {
        _id: "6457f5b9746d3231b7dab2cc",
        role: "defense",
      },
      {
        _id: "64580468032a849f98f08ebc",
        role: "attack",
      },
      {
        _id: "64580511032a849f98f08ec9",
        role: "defense",
      },
      {
        _id: "64580531032a849f98f08ed0",
        role: "attack",
      },
    ],
    outcome: -1,
  };
  const emptyContracts = [];
  const validContracts = [
    {
      key: "8plis",
      folds: 8,
      attack: 2,
      defense: 2,
    },
    {
      key: "9plis",
      folds: 9,
      attack: 2,
      defense: 2,
    },
    {
      key: "solo6",
      folds: 6,
      attack: 1,
      defense: 3,
    },
    {
      key: "10plis",
      folds: 10,
      attack: 2,
      defense: 2,
    },
    {
      key: "solo7",
      folds: 7,
      attack: 1,
      defense: 3,
    },
    {
      key: "11plis",
      folds: 11,
      attack: 2,
      defense: 2,
    },
    {
      key: "petitemisere",
      folds: 0,
      attack: 1,
      defense: 3,
    },
    {
      key: "solo8",
      folds: 8,
      attack: 1,
      defense: 3,
    },
    {
      key: "12plis",
      folds: 12,
      attack: 2,
      defense: 2,
    },
    {
      key: "13plis",
      folds: 13,
      attack: 2,
      defense: 2,
    },
    {
      key: "trou8",
      folds: 8,
      attack: 2,
      defense: 2,
    },
    {
      key: "trou9",
      folds: 9,
      attack: 2,
      defense: 2,
    },
    {
      key: "grandchelem",
      folds: 13,
      attack: 1,
      defense: 3,
    },
    {
      key: "grandemisere",
      folds: 0,
      attack: 1,
      defense: 3,
    },
  ];
  describe("Assessment of empty game", () => {
    // Emptycase
    describe("When game is empty", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceProceedCheck(emptyGame, validContracts);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then state changes are provided", () => {
        const serviceOutcome = serviceProceedCheck(emptyGame, validContracts);
        expect(serviceOutcome.stateChanges.contractError).toBeTruthy();
      });
      test("then errors are provided", () => {
        const serviceOutcome = serviceProceedCheck(emptyGame, validContracts);
        expect(serviceOutcome.errors).toContain("game.error.missingcontract");
      });
    });
  });
  describe("Assessment of empty contract list", () => {
    // Emptycase
    describe("When the contract list is empty", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceProceedCheck(validGame, emptyContracts);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then state changes are provided", () => {
        const serviceOutcome = serviceProceedCheck(validGame, emptyContracts);
        expect(serviceOutcome.stateChanges.contractError).toBeTruthy();
      });
      test("then errors are provided", () => {
        const serviceOutcome = serviceProceedCheck(validGame, emptyContracts);
        expect(serviceOutcome.errors).toContain("game.error.missingcontract");
      });
    });
  });
  describe("Assessment of attack check", () => {
    const invalidAttackGame = {
      _id: "",
      table: "123",
      contract: "9plis",
      players: [
        {
          _id: "34567",
          role: "defense",
        },
        {
          _id: "12345",
          role: "defense",
        },
        {
          _id: "56789",
          role: "attack",
        },
        {
          _id: "45678",
          role: "attack",
        },
        {
          _id: "23456",
          role: "attack",
        },
      ],
      outcome: -1,
    };
    describe("When attack is badly formed", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidAttackGame,
          validContracts
        );
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidAttackGame,
          validContracts
        );
        expect(serviceOutcome.stateChanges.attackError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidAttackGame,
          validContracts
        );
        expect(serviceOutcome.errors).toContain("game.error.attackmissmatch");
      });
    });
  });
  describe("Assessment of defense check", () => {
    const invalidDefenseGame = {
      _id: "",
      table: "123",
      contract: "9plis",
      players: [
        {
          _id: "34567",
          role: "defense",
        },
        {
          _id: "12345",
          role: "defense",
        },
        {
          _id: "56789",
          role: "defense",
        },
        {
          _id: "45678",
          role: "attack",
        },
        {
          _id: "23456",
          role: "attack",
        },
      ],
      outcome: -1,
    };
    describe("When defense is badly formed", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidDefenseGame,
          validContracts
        );
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidDefenseGame,
          validContracts
        );
        expect(serviceOutcome.stateChanges.defenseError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidDefenseGame,
          validContracts
        );
        expect(serviceOutcome.errors).toContain("game.error.defensemissmatch");
      });
    });
  });
  describe("Assessment of outcome check", () => {
    const invalidOutcomeGame = {
      _id: "",
      table: "123",
      contract: "12plis",
      players: [
        {
          _id: "34567",
          role: "defense",
        },
        {
          _id: "56789",
          role: "defense",
        },
        {
          _id: "45678",
          role: "attack",
        },
        {
          _id: "23456",
          role: "attack",
        },
      ],
      outcome: 3,
    };
    describe("When outcome is inconsistent", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidOutcomeGame,
          validContracts
        );
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidOutcomeGame,
          validContracts
        );
        expect(serviceOutcome.stateChanges.outcomeError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(
          invalidOutcomeGame,
          validContracts
        );
        expect(serviceOutcome.errors).toContain("game.error.outcomemissmatch");
      });
    });
  });
});
