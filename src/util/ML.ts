import * as tf from '@tensorflow/tfjs'
import { Board } from '../types';

export default async function LearningArtificialIntelligence(handleClick: Function, board: Board, xIsNext: boolean) {
    const model = createModel()

    // Convert the data to a form we can use for training.
    const inputs = convertToTensor(board, xIsNext);
    // Train the model
    // await trainModel(model, tensorData);
    // console.log('Done Training');

    // testModel(model, data, tensorData);
    console.log(model.predict(inputs).toString())
}

// create model
// convert data to tensor
// run tensor through model AKA Play the game
// did I win the game?
// loop

function createModel() {
    // Create a sequential model
    const model = tf.sequential();

    // Add a single input layer
    model.add(tf.layers.dense({ inputShape: [10], units: 1, useBias: true }));

    // Add a hidden layer
    model.add(tf.layers.dense({ units: 24, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 8, activation: 'relu' }));

    // Add an output layer
    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;
}

/**
* Convert the input data to tensors that we can use for machine
* learning. We will also do the important best practices of _shuffling_
* the data and _normalizing_ the data
* MPG on the y-axis.
*/
function convertToTensor(data: Board, xIsNext: boolean) {
    // Wrapping these calculations in a tidy will dispose any
    // intermediate tensors.

    return tf.tidy(() => {
        const inputs = [...data.map((d) => {
            switch (d) {
                case 'X':
                    return 1;
                case 'O':
                    return 0;
                default: // null
                    return 0.5;
            }
        }), xIsNext ? 1 : 0]

        return tf.tensor2d(inputs, [inputs.length, 1]);
    });
}

// async function trainModel(model, inputs, labels) {
//     // Prepare the model for training.
//     model.compile({
//         optimizer: tf.train.adam(),
//         loss: tf.losses.meanSquaredError,
//         metrics: ['mse'],
//     });

//     const batchSize = 32;
//     const epochs = 50;

//     return await model.fit(inputs, labels, {
//         batchSize,
//         epochs,
//         shuffle: true,
//         callbacks: tfvis.show.fitCallbacks(
//             { name: 'Training Performance' },
//             ['loss', 'mse'],
//             { height: 200, callbacks: ['onEpochEnd'] }
//         )
//     });
// }

// function testModel(model, inputData, normalizationData) {
//     const { inputMax, inputMin, labelMin, labelMax } = normalizationData;

//     // Generate predictions for a uniform range of numbers between 0 and 1;
//     // We un-normalize the data by doing the inverse of the min-max scaling
//     // that we did earlier.
//     const [xs, preds] = tf.tidy(() => {

//         const xs = tf.linspace(0, 1, 100);
//         const preds = model.predict(xs.reshape([100, 1]));

//         const unNormXs = xs
//             .mul(inputMax.sub(inputMin))
//             .add(inputMin);

//         const unNormPreds = preds
//             .mul(labelMax.sub(labelMin))
//             .add(labelMin);

//         // Un-normalize the data
//         return [unNormXs.dataSync(), unNormPreds.dataSync()];
//     });


//     const predictedPoints = Array.from(xs).map((val, i) => {
//         return { x: val, y: preds[i] }
//     });

//     const originalPoints = inputData.map(d => ({
//         x: d.horsepower, y: d.mpg,
//     }));


//     tfvis.render.scatterplot(
//         { name: 'Model Predictions vs Original Data' },
//         { values: [originalPoints, predictedPoints], series: ['original', 'predicted'] },
//         {
//             xLabel: 'Horsepower',
//             yLabel: 'MPG',
//             height: 300
//         }
//     );
// }