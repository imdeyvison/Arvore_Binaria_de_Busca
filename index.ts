class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree<T> {
    private root: TreeNode<T> | null = null;

    // Inserção na ABB
    insert(value: T): void {
        const newNode = new TreeNode(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
    }

    // Pesquisa
    search(value: T): boolean {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    // Busca em largura
    breadthFirstSearch(): T[] {
        const result: T[] = [];
        const queue: (TreeNode<T> | null)[] = [];
        if (this.root) queue.push(this.root);

        while (queue.length) {
            const node = queue.shift()!;
            result.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }

    // Pré-ordem
    preOrder(node = this.root, result: T[] = []): T[] {
        if (node) {
            result.push(node.value);
            this.preOrder(node.left, result);
            this.preOrder(node.right, result);
        }
        return result;
    }

    // Em-ordem
    inOrder(node = this.root, result: T[] = []): T[] {
        if (node) {
            this.inOrder(node.left, result);
            result.push(node.value);
            this.inOrder(node.right, result);
        }
        return result;
    }

    // Pós-ordem
    postOrder(node = this.root, result: T[] = []): T[] {
        if (node) {
            this.postOrder(node.left, result);
            this.postOrder(node.right, result);
            result.push(node.value);
        }
        return result;
    }

    // Altura da árvore
    height(node = this.root): number {
        if (!node) return 0;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    // Quantidade de elementos
    size(node = this.root): number {
        if (!node) return 0;
        return 1 + this.size(node.left) + this.size(node.right);
    }

    // Nós ancestrais de um elemento
    ancestors(value: T): T[] {
        const result: T[] = [];
        let current = this.root;

        while (current) {
            if (value === current.value) break;
            result.push(current.value);
            current = value < current.value ? current.left : current.right;
        }
        return current ? result : [];
    }

    // Nós descendentes de um elemento
    descendants(value: T): T[] {
        const target = this.findNode(this.root, value);
        if (!target) return [];

        const result: T[] = [];
        this.preOrder(target.left, result);
        this.preOrder(target.right, result);
        return result;
    }

    // Nível de um elemento
    level(value: T): number {
        let level = 0;
        let current = this.root;

        while (current) {
            if (value === current.value) return level;
            current = value < current.value ? current.left : current.right;
            level++;
        }
        return -1;
    }

    // Estritamente binária
    isStrictBinary(node = this.root): boolean {
        if (!node) return true;
        if ((node.left && !node.right) || (!node.left && node.right)) return false;
        return this.isStrictBinary(node.left) && this.isStrictBinary(node.right);
    }

    // Árvore cheia
    isFull(node = this.root): boolean {
        if (!node) return true;
        if (!node.left && !node.right) return true;
        if (node.left && node.right)
            return this.isFull(node.left) && this.isFull(node.right);
        return false;
    }

    // Auxiliar para encontrar nó
    private findNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (!node) return null;
        if (node.value === value) return node;
        return value < node.value
            ? this.findNode(node.left, value)
            : this.findNode(node.right, value);
    }
}
let bst = new BinarySearchTree<number>();

function inserir() {
    let valor = (document.getElementById("valor") as HTMLInputElement).value;
    if (valor) {
        bst.insert(Number(valor));
        mostrarResultado(`Valor ${valor} inserido.`);
    }
}

function buscar() {
    let valor = (document.getElementById("valor") as HTMLInputElement).value;
    if (valor) {
        let achou = bst.search(Number(valor));
        mostrarResultado(achou ? "Valor encontrado!" : "Valor não encontrado.");
    }
}

function mostrarLargura() {
    mostrarResultado("Busca em Largura: " + bst.breadthFirstSearch().join(", "));
}

function mostrarPreOrdem() {
    mostrarResultado("Pré-Ordem: " + bst.preOrder().join(", "));
}

function mostrarEmOrdem() {
    mostrarResultado("Em-Ordem: " + bst.inOrder().join(", "));
}

function mostrarPosOrdem() {
    mostrarResultado("Pós-Ordem: " + bst.postOrder().join(", "));
}

function mostrarAltura() {
    mostrarResultado("Altura: " + bst.height());
}

function mostrarTamanho() {
    mostrarResultado("Quantidade de elementos: " + bst.size());
}

function mostrarAncestrais() {
    let valor = (document.getElementById("valorExtra") as HTMLInputElement).value;
    if (valor) {
        mostrarResultado("Ancestrais: " + bst.ancestors(Number(valor)).join(", "));
    }
}

function mostrarDescendentes() {
    let valor = (document.getElementById("valorExtra") as HTMLInputElement).value;
    if (valor) {
        mostrarResultado("Descendentes: " + bst.descendants(Number(valor)).join(", "));
    }
}

function mostrarNivel() {
    let valor = (document.getElementById("valorExtra") as HTMLInputElement).value;
    if (valor) {
        mostrarResultado("Nível: " + bst.level(Number(valor)));
    }
}

function verificarEstrita() {
    mostrarResultado("Estritamente Binária? " + (bst.isStrictBinary() ? "Sim" : "Não"));
}

function verificarCheia() {
    mostrarResultado("Árvore Cheia? " + (bst.isFull() ? "Sim" : "Não"));
}

function mostrarResultado(texto: string) {
    (document.getElementById("resultado") as HTMLPreElement).textContent = texto;
}
