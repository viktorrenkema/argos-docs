# Codeblock

<pre class="language-yml" data-title=".github/workflows/ci.yml"><code class="lang-yml">jobs:
  e2e-tests:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy: // [!code --] 
      fail-fast: false // [!code ++] 
      matrix:
<strong>        shardIndex: [1, 2, 3, 4] // [!code --] 
</strong><strong>    steps: // [!code ++] 
</strong>      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
</code></pre>
