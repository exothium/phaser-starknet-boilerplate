![plot](https://github.com/exothium/phaser-starknet-boilerplate//blob/8eaf4817575a377255a72bd2d06a2a88f567175f/src/assets/phaser-starknet-logo.png?raw=true)

# Phaser-Starknet-Boilerplate

The project main goal is to create a structure of components using starknet calls. It's a tool to give any phaser developer the possibility to quickly bootstrap a game without the need to deal with all the difficulties to interact with starknet.

---

## Why Phaser?

Phaser is a popular open-source framework for building HTML5 games and has some advantages over using proprietary engines like Unity or Unreal Engine for web3:

**Cost**: Phaser is free, while Unity and Unreal Engine both have licensing fees.

**Ease of use**: Phaser has a simpler learning curve compared to Unity and Unreal Engine, making it easier for developers to get started.

**Browser compatibility**: Phaser games run natively in web browsers, which makes them more accessible and easier to distribute than games built with proprietary engines that require specialized players.

**Performance**: Phaser is optimized for 2D game development, which is well suited for many web3 applications. Additionally, because Phaser is lightweight and designed for the web, games built with it tend to have better performance compared to larger and more complex engines like Unity and Unreal Engine.

**Flexibility**: Phaser is designed to be highly customizable, allowing developers to easily modify or extend the engine to meet their specific needs.

Other open-source frameworks to build HTML5 games include:
- PixiJS
- BabylonJS
- Three.js
- MelonJS
- Godot

The choice between these frameworks will depend on the specific requirements of the project. For example, if a developer is looking to build a 2D game, Phaser or MelonJS may be the best choice. If a developer is looking to build a 3D game or experience, BabylonJS or Three.js may be a better choice.
On the other hand, if a developer is looking to build a game that requires a lot of customization and if he is also familiar with Python (since uses its own scripting language, GDScript, which is based on Python), then Godot may be a better choice.


## What you will get?

| The entire interface:                      | Deploy contracts using HardHat Plugin |
|------------------------------------------------|---------------------------------------|
| ![plot](https://github.com/exothium/phaser-starknet-boilerplate/blob/23254427c40be1723b5805f2b1092bdcfe13374c/src/assets/demos/phaser-starknet.gif?raw=true) | Coming Soon                           |

---

## Built with
+ TypeScript
+ Phaser 3 
+ get-starknet
+ hardhat

---

## Usage

### Frontend
+ Clone the repository
+ Install dependencies
```bash
npm install
```
+ Run the project with
```bash
npm run start
```

### Contracts with HardHat Plugin
- We have a HardHat plugin that makes it easier to deploy contracts to StarkNet. You can find it [here](https://shard-labs.github.io/starknet-hardhat-plugin/docs/)
- We also opted with an existing virtual environment to deploy the contracts. You can find it [here](https://shard-labs.github.io/starknet-hardhat-plugin/docs/intro#existing-virtual-environment)


#### Requirements
- Node.js v14.17.3
- npm/npx v7.19.1





## Coming Soon
We will add Hardhat to the project to make it easier to deploy the contracts. 

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please read our [contributing guidelines](https://github.com/exothium/phaser-starknet-boilerplate/blob/main/docs/CONTRIBUTING.md)

## Contributors
+ [Angelo Bastos](https://github.com/Metronomy)
+ [Hugo Freire](https://github.com/hugofreire)

---
