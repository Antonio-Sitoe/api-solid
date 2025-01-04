# Documentação do Docker e Docker Compose

## Introdução ao Docker

### O que é Docker?

Docker é uma plataforma de software que permite criar, testar e implantar aplicações rapidamente. O Docker empacota o software em unidades padronizadas chamadas contêineres, que incluem tudo o que o software precisa para funcionar: código, runtime, bibliotecas, e configurações do sistema.

### Para que serve o Docker?

O Docker é utilizado para garantir que o software funcione de maneira consistente em diferentes ambientes, desde o desenvolvimento até a produção. Ele ajuda a eliminar problemas de compatibilidade e dependências, facilitando a escalabilidade e a portabilidade das aplicações.

### Quando usar Docker?

- **Desenvolvimento**: Para criar um ambiente de desenvolvimento consistente.
- **Testes**: Para testar aplicações em diferentes configurações sem a necessidade de múltiplos servidores físicos.
- **Implantação**: Para implantar aplicações de maneira rápida e eficiente em qualquer ambiente.

## Introdução ao Docker Compose

### O que é Docker Compose?

Docker Compose é uma ferramenta para definir e gerenciar aplicações multi-contêiner no Docker. Com o Docker Compose, você pode usar um arquivo YAML para configurar os serviços da sua aplicação. Então, com um único comando, você pode criar e iniciar todos os serviços a partir da sua configuração.

### Para que serve o Docker Compose?

O Docker Compose é útil para gerenciar aplicações que consistem em múltiplos contêineres, permitindo definir serviços, redes e volumes em um único arquivo. Ele simplifica a orquestração de contêineres, tornando fácil iniciar, parar e monitorar serviços interdependentes.

### Quando usar Docker Compose?

- **Desenvolvimento Local**: Para configurar ambientes de desenvolvimento complexos com múltiplos serviços.
- **Testes de Integração**: Para testar interações entre diferentes serviços em um ambiente isolado.
- **Ambientes de Staging**: Para replicar a configuração de produção em um ambiente de staging.

## Comandos Básicos do Docker

### Executar um Contêiner

Para montar um contêiner usando Docker, você pode seguir este exemplo básico:

```bash
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

### Verificar Contêineres Disponíveis

Para ver os contêineres em execução:

```bash
docker ps
```

### Parar um Contêiner

Para parar um contêiner específico:

```bash
docker stop api-solid-api-solid-pg-1
```

## Comandos Básicos do Docker Compose

### Criar um Arquivo `docker-compose.yml`

Aqui está um exemplo de um arquivo `docker-compose.yml` para configurar uma base de dados PostgreSQL:

```yaml
services:
  api-solid-pg:
    image: bitnami/postgresql
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USERNAME=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DATABASE=apisolid
```

### Subir Contêineres com Docker Compose

Para subir os contêineres e ver os logs:

```bash
docker compose up
```

Para subir os contêineres em segundo plano (sem logs):

```bash
docker compose up -d
```

### Parar e Remover Contêineres

Para parar todos os contêineres:

```bash
docker compose down
```

**Nota:** Usar `docker compose down` destruirá todos os dados dos contêineres, incluindo tabelas e conteúdo inserido na base de dados.

## Exemplos de Uso

### Subindo um Contêiner PostgreSQL

```bash
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

### Usando Docker Compose

Crie um arquivo `docker-compose.yml` com o seguinte conteúdo:

```yaml
services:
  api-solid-pg:
    image: bitnami/postgresql
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USERNAME=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DATABASE=apisolid
```

Para subir os serviços definidos no arquivo `docker-compose.yml`:

```bash
docker compose up
```

Para parar e remover os serviços:

```bash
docker compose down
```

### Comandos Adicionais

- **Verificar contêineres em execução**: `docker ps`
- **Parar um contêiner específico**: `docker stop <nome_do_container>`

## Conclusão

Esta documentação fornece uma visão geral do Docker e Docker Compose, descrevendo suas definições, utilidades e comandos básicos. Com esses conhecimentos, você pode configurar e gerenciar seus contêineres de forma eficiente, garantindo consistência e portabilidade em seus ambientes de desenvolvimento e produção.
