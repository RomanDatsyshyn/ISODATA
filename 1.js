let z = [];
let d = [];
let d2;
let sg = [];
let sgm = [];
let k = 3;
let qn = 1;
let qs = 1;
let qc = 3;
let l = 1;
let nc = 1;
let iterCounter = 1;

function step2(clusters, points) {
    console.log(2);
    clusters = [];
    for (let i = 0; i < z.length; i++) {
        clusters.push([]);
    }

    for (let i = 0; i < points.length; i++) {
        let AB = [];
        for (let j = 0; j < z.length; j++) {
            AB.push(Math.sqrt(Math.pow(z[j].x - points[i].x, 2) + Math.pow(z[j].y - points[i].y, 2)));
        }
        clusters[smaller(AB)].push(points[i]);
    }
    iterCounter++;
    step3(clusters, points);
}

function smaller(AB) {
    let a = AB[0];
    for (let i = 0; i < AB.length; i++) {
        if (AB[i] < a) a = AB[i];
    }
    return AB.indexOf(a);
}

function step3(clusters, points) {
    console.log(3);
    let clustersTemp = [];
    for (let i = 0; i < clusters.length; i++) {
        if (clusters[i].length > qn) {
            clustersTemp.push(clusters[i]);
        } else delete z[i];
    }
    clusters = clustersTemp;
    step4(clusters, points);
}

function step4(clusters, points) {
    console.log(4);
    for (let i = 0; i < clusters.length; i++) {
        let zt = {
            x: 0,
            y: 0
        };
        z[i] = {
            x: 0,
            y: 0
        };
        for (let j = 0; j < clusters[i].length; j++) {
            zt.x += clusters[i][j].x;
            zt.y += clusters[i][j].y;
        }
        z[i].x = zt.x / clusters[i].length;
        z[i].y = zt.y / clusters[i].length;
    }

    document.getElementById("text1").value += "--------------------------[" + iterCounter + "]------------------------\n";
    printer(clusters, points);
    if (((iterCounter == 3 || iterCounter == 4) && nc == k) || iterCounter >= 4) {
        graphica(clusters);
        return 0;
    } else step5(clusters, points);
}

function step5(clusters, points) {
    console.log(5);
    for (let i = 0; i < clusters.length; i++) {
        let ab = 0
        for (let j = 0; j < clusters[i].length; j++) {
            ab += Math.sqrt(Math.pow(z[i].x - clusters[i][j].x, 2) + Math.pow(z[i].y - clusters[i][j].y, 2));
        }
        d[i] = ab / clusters[i].length;
    }
    step6(clusters, points);
}

function step6(clusters, points) {
    console.log(6);
    let ab = 0;
    for (let i = 0; i < clusters.length; i++) {
        ab += d[i] * clusters[i].length;
    }
    d2 = ab / points.length;
    step7(clusters, points);
}

function step7(clusters, points) {
    console.log(7);
    if (nc <= k) {
        step8(clusters, points);
    } else step11(clusters, points);
}

function step8(clusters, points) {
    console.log(8);
    for (let i = 0; i < clusters.length; i++) {
        let mid = {
            x: 0,
            y: 0
        };
        sg[i] = {
            x: 0,
            y: 0
        };
        for (let j = 0; j < clusters[i].length; j++) {
            mid.x += clusters[i][j].x;
            mid.y += clusters[i][j].y;
        }
        mid.x = mid.x / clusters[i].length;
        mid.y = mid.y / clusters[i].length;
        for (let j = 0; j < clusters[i].length; j++) {
            sg[i].x += Math.pow(clusters[i][j].x - mid.x, 2);
            sg[i].y += Math.pow(clusters[i][j].y - mid.y, 2);
        }
        sg[i].x = Math.sqrt(sg[i].x / clusters[i].length);
        sg[i].y = Math.sqrt(sg[i].y / clusters[i].length);
    }
    step9(clusters, points);
}

function step9(clusters, points) {
    console.log(9);
    for (let i = 0; i < clusters.length; i++) {
        if (sg[i].x > sg[i].y) {
            sgm[i] = {
                x: sg[i].x,
                y: 0
            };
        } else sgm[i] = {
            x: 0,
            y: sg[i].y
        };
    }
    step10(clusters, points);
}

function step10(clusters, points) {
    console.log(10);
    let ztt = [];
    for (let i = 0; i < clusters.length; i++) {
        let gamma = [];
        if (sgm[i].x > 1 || sgm[i].y > 1) {
            nc++;
            gamma = {
                x: 0.8 * sgm[i].x,
                y: 0.8 * sgm[i].y
            };
            ztt.push({
                x: z[i].x + gamma.x,
                y: z[i].y + gamma.y
            });
            ztt.push({
                x: z[i].x - gamma.x,
                y: z[i].y - gamma.y
            });
        } else {
            ztt.push(z[i]);
        }
    }
    z = ztt;
    step2(clusters, points);
}

function step11(clusters, points) {
    console.log(11);
    let tt = 0;
    for (let i = 0; i < z.length; i++) {
        for (let j = 0; j < z.length; j++) {
            if (i != j) {
                if ((Math.sqrt(Math.pow(z[i].x - z[j].x, 2) + Math.pow(z[i].y - z[j].y, 2))) < qc) {
                    tt++;
                    step13(i, j, clusters, points);
                };
            }
        }
    }
    if (tt == 0) step2(clusters, points);
}

function step13(n, nn, clusters, points) {
    console.log(13);
    let ztt = [];
    for (let i = 0; i < z.length; i++) {
        if (i != n && i != nn) {
            ztt.push(z[i]);
        } else if (i == n) {
            ztt.push({
                x: (z[n].x + z[nn].x) / 2,
                y: (z[n].y + z[nn].y) / 2
            });
        }
    }
    nc--;
    z = ztt;
    step2(clusters, points);
}

function printer(clusters, points) {
    for (let i = 0; i < clusters.length; i++) {
        for (let j = 0; j < clusters[i].length; j++) {
            document.getElementById("text1").value += "x: " + clusters[i][j].x + ",\ty: " + clusters[i][j].y + "\n";
        }
        if (z[i]) {
            document.getElementById("text1").value += "\nCenter : (" + z[i].x.toFixed(1) + ":" + z[i].y.toFixed(1) + ")\n\n";
        }

    }
}

let ze = [];

function conv() {
    ze = z;
    for (let i = 0; i < ze.length; i++) {
        Object.assign(ze[i], {
            shape: 'diamond'
        });
        Object.assign(ze[i], {
            size: 0.7
        });
    }
}