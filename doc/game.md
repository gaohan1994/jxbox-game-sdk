## 卡牌融合游戏

收藏，展示，合成卡片的一个小游戏

游戏平台：web 端，小程序

开发语言：typescript

目前暂定为不使用游戏引擎，而是直接使用 web 技术（主要原因是不会，学习成本有点高）

因为游戏并不复杂，一些特效和动画 web 就可以做到了问题应该不大

数据全部存放于 localstorage 目前暂时不设立后端（轻游戏）

### 游戏内容

卡牌根据稀有程度分为

- 普通-白
- 特殊-蓝
- 稀有-紫
- 史诗-橙
- 传说-黄
- 神-黑
- 奇遇-粉（暂时不出）

白卡可以直接获取（通过点击按钮白送）

蓝卡以上则需要合成

卡片合成规则：

必须两张相同稀有度卡片进行合成

- 2 白 90% 出蓝 10%失败随机保留一张
- 2 蓝 50% 成功出紫 50%失败随机保留一张
- 2 紫 25% 成功出橙 75%失败随机保留一张
- 2 橙 12.5% 成功出黄 87.5%失败随机保留一张
- 2 黄 100% 成功出黑

合成成功的卡片阵营为 2 张合成卡片阵营 2 选 1，如果 2 张卡片是相同阵营的，则成功必出该阵营的卡牌

### 排行榜

神卡和奇遇卡设立排行榜

排行榜可以查看每张神卡/奇遇卡的合成路径和合成时间以及合成人

但是目前没有设立后端所以暂时没法做排行榜

## 卡片 Card

| Attribute   | Type          | Description                                                                     |
| ----------- | ------------- | ------------------------------------------------------------------------------- |
| id          | number        | 卡片 id                                                                         |
| accountId   | number        | 所属用户 id                                                                     |
| level       | number        | 卡片等级                                                                        |
| rarity      | Rarity        | 普通-白 特殊-蓝 稀有-紫 史诗-橙 传说-黄 神-黑 奇遇-粉                           |
| name        | string        | 卡片名称                                                                        |
| faction     | Faction       | 卡片阵营                                                                        |
| description | string        | 卡片简介                                                                        |
| medals      | Array<Medal>  | 卡片的勋章                                                                      |
| createTime  | string        | 创建时间                                                                        |
| fusionPath  | Array<number> | 合成路径 由合成的卡片 id 组成，每次合成成功将合成卡牌的 id 加入到 fusionPath 中 |

## 卡片稀有度 Rarity

需要参考一下 炉石传说 和 FIFA online 的再看看

| Attribute   | Type   | Description                                                           |
| ----------- | ------ | :-------------------------------------------------------------------- |
| id          | number | 稀有度 id                                                             |
| name        | string | 稀有度 oneOf [normal, special, rare, epic, legendary, immortal, 奇遇] |
| label       | string | 稀有度 oneOf [普通, 特殊, 稀有, 史诗, 传说, 神话, 奇遇]               |
| Value       | number | 稀有度的值 oneOf [1, 2, 3, 4, 5, 6, 7]                                |
| icon        | string | 稀有度图标                                                            |
| description | string | 稀有度简介和稀有度描述                                                |

## 卡片勋章 Medal

| Attribute   | Type   | Description        |
| ----------- | ------ | :----------------- |
| id          | number | 勋章 id            |
| name        | string | 勋章名称           |
| icon        | string | 勋章图标           |
| description | string | 勋章简介和勋章描述 |

## 卡片阵营 Faction

| Attribute   | Type   | Description        |
| ----------- | ------ | ------------------ |
| id          | number | 阵营 id            |
| name        | string | 阵营名称           |
| icon        | string | 阵营图标           |
| description | string | 阵营简介和阵营描述 |

## 用户 Account

| Attribute   | Type   | Description  |
| ----------- | ------ | ------------ |
| id          | number | 用户 id      |
| displayName | string | 用户昵称     |
| createTime  | string | 用户创建时间 |
| avatar      | string | 用户头像     |

## 伪代码

card/card.ts

```typescript
interface CardConstructorPayload {
  rarity: Rarity;
  faction?: Faction;
}

class Card {
  constructor({}: CardConstructorPayload) {}
}
```

fusion/FusionCard.ts

```typescript
class Fusion {
  private primaryCard: Card;
  private secondaryCard: Card;

  constructor(primaryCard: Card, secondaryCard: Card) {
    this.primaryCard = primaryCard;
    this.secondaryCard = secondaryCard;
  }

  public get isSameRarity() {
    return this.primaryCard.rarity.value === this.secondaryCard.rarity.value;
  }

  public get currentRarity() {
    return this.primaryCard.rarity;
  }

  public fusion = () => {
    if (!this.isSameRarity) {
      throw new Error('请使用相同稀有度的卡片合成');
    }
    const { fusionSuccessRate, fusionSuccessRarity, fusionSuccessFaction } =
      createFusionCalculator({
        rarity: this.currentRarity,
        factions: [this.primaryCard.faction, this.secondaryCard.faction],
      }).fusionConfig;

    if (!checkFusionIsSuccess(fusionSuccessRate)) {
      return {
        fusionSuccess: false,
        fusionCard: this.pickFusionFailCard(),
      };
    }

    return {
      fusionSuccess: true,
      fusionCard: createFusionCard({
        primartyCard: this.primaryCard,
        secondaryCard: this.secondaryCard,
        rarity: fusionSuccessRarity,
        faction: fusionSuccessFaction,
      }),
    };
  };

  private checkFusionIsSuccess = (fusionSuccessRate) =>
    generateRandom(0, 100, true) <= fusionSuccessRate * 100;

  private pickFusionFailCard = () =>
    generateRandom() <= 50 ? this.primaryCard : this.secondaryCard;
}
```

calculator/create-fusion-calculator.ts

```typescript
const createFusionCalculator = (options: FusionCalculatorConstructor) => {
  switch (options.rarity.name) {
    case RarityName.Normal:
      return new NormalFusionCalculator(options);
    case RarityName[key]:
      return new KeyFusionCalculator(options);
    default:
      throw new Error('unknow card fusion raritys');
  }
};
```

calculator/fusion-calculator.ts

```typescript
interface FusionCalculatorConfig {
  // 合成成功概率
  fusionSuccessRate: number;
  // 合成成功之后的卡片等级
  fusionSuccessRarity: Rarity;
  // 合成成功之后的卡片阵营
  fusionSuccessFaction: Faction;
}

interface FusionCalculatorConstructor {
  rarity: Rarity;
  factions: Array<Faction>;
}

class FusionCalculator {
  constructor({ rarity, factions }: FusionCalculatorConstructor) {
    this.rarity = rariry;
    this.factions = factions;
  }

  public get fusionConfig() {
    throw new Error('unknow Fusion type');
  }

  public get fusionSuccessFaction() {
    return this.factions[0].name === this.factions[1].name
      ? this.factions[0]
      : generateRandom() <= 50
      ? this.factions[0]
      : this.factions[1];
  }
}
```

calculator/normal-fusion-calculator.ts

```typescript
const SUCCESS_RATE = 0.9;
const NEXT_RARITY_VALUE = RarityValue.NOMAL + 1;

class NormalFusionCalculator extends FusionCalculator {
  public get fusionConfig(): FusionCalculatorConfig {
    return {
      fusionSuccessRate: SUCCESS_RATE,
      fusionSuccessRarity: new Rarity(NEXT_RARITY_VALUE),
      fusionSuccessFaction: super.fusionSuccessFaction,
    };
  }
}
```

utils.ts

```typescript
const generateRandom = (startNumber = 0, endNumber = 100, ...rest): number =>
  lodash.random(startNumber, endNumber, ...rest);
```
