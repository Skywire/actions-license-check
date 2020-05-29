# Magento module license check

This action checks for the existence of a LICENSE.txt file in every module within a namespace

## Inputs

### `namespaces`

**Required** A comma separated list of namespaces, e.g. `app/code/Skywire,app/code/ClientNamespace`.

## Example usage

```yaml
-   name: Check licenses exist in module directories
    uses: skywire/actions-license-check@master
    with:
        namespaces: app/code/Skywire,app/code/ClientNamespace
```
### Auto generating licenses

To auto generate missing licenses use the `auto_generate` argument and add a commit action to your workflow

```yaml
-   name: Check licenses exist in module directories and generate if they don't
    uses: skywire/actions-license-check@master
    with:
        namespaces: app/code/Skywire,app/code/ClientNamespace
        auto_generate: true
    # Commit the generated files
    -   uses: EndBug/add-and-commit@v4
        with:
          add: app/code/*LICENSE.txt*
          message: "Add missing module licenses"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}