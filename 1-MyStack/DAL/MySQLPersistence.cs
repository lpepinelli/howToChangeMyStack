using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Text.RegularExpressions;

namespace _1_MyStack.DAL
{
    public class MySQLPersistence
    {
        MySqlConnection _connection = null;
        MySqlCommand _cmd = null;
        bool _closeConnection = true;
        bool _withTransaction = false;
        MySqlTransaction _transaction = null;

        Int64 _lastId;

        public long LastId { get => _lastId; set => _lastId = value; }

        public MySQLPersistence(bool closeConnection = true, bool withTransaction = false)
        {
           string strCon = @"server=localhost;user=root;database=1.stack;port=3306;password=153624";

            _connection = new MySqlConnection(strCon);

            _closeConnection = closeConnection;
            _withTransaction = withTransaction;
            _cmd = _connection.CreateCommand();
        }

        public void Open()
        {
            if (_connection.State != System.Data.ConnectionState.Open)
            {
                _connection.Open();

                if (_withTransaction)
                {
                    _transaction = _connection.BeginTransaction();
                }
            }
        }

        public void Close()
        {
            _connection.Close();
        }

        public void Commit()
        {

            _transaction.Commit();
            _transaction = null;
        }

        public void Rollback()
        {
            _transaction.Rollback();
            _transaction = null;
        }

        public DataTable GetData(string select, Dictionary<string, object> parameters = null, bool procedure = false)
        {
            if(_withTransaction)
                _cmd = new MySqlCommand(select, _connection, _transaction);
            else
                _cmd.CommandText = select;

            if (procedure)
            {
                _cmd.CommandType = CommandType.StoredProcedure;
            }

            if (parameters != null)
            {
                _cmd.Parameters.Clear();
                foreach (var item in parameters)
                {
                    _cmd.Parameters.AddWithValue(item.Key, item.Value);
                }
            }

            DataTable dt = new DataTable();

            dt.Load(_cmd.ExecuteReader());

            if (_closeConnection)
                Close();

            return dt;
        }


        public int Execute(string instruction, Dictionary<string, object> parameters = null)
        {
            _cmd = new MySqlCommand(instruction, _connection, _transaction);

            if (parameters != null)
            {
                _cmd.Parameters.Clear();
                foreach (var item in parameters)
                {
                    if(item.Value != null)
                        _cmd.Parameters.AddWithValue(item.Key, item.Value);
                    else
                        _cmd.Parameters.AddWithValue(item.Key, DBNull.Value);
                }
            }

            _lastId = Convert.ToInt64(_cmd.ExecuteScalar());

            if (_closeConnection)
                Close();

            return (Int32)_lastId;
        }
        public string SqlExceptionHandle(Exception e)
        {
            Dictionary<string, string> Messages = new Dictionary<string, string> {{"A instrução (?<Instruction>.*) conflitou com a restrição do REFERENCE \"(.*)\". O conflito ocorreu no banco de dados \"RGB-Galpao\", tabela \"(?<Table>.*)\", column '(.*)'.\r\nA instrução foi finalizada.", "Erro ao {0} o registro, ele possui vínculo com a tabela de {1}."}};
            Dictionary<string, string> Instructions = new Dictionary<string, string> { { "INSERT", "Inserir" }, { "UPDATE", "Alterar" }, { "DELETE", "Deletar" } };
            Dictionary<string, string> Tables = new Dictionary<string, string> {
                { "dbo.PRODUTOLOTE", "Lotes do Produto" },
                { "dbo.INSUMOLOTE", "Lotes do Insumo" },
                { "dbo.PRODUCAO", "Produção" },
                { "dbo.INSUMOS_PRODUCAO", "Insumos da Produção" },
                { "dbo.AJUSTE", "Ajuste" },
                { "dbo.PRODUTOS_COMPRA", "Compra" },
                { "dbo.INSUMOS_COMPRA", "Compra" },
                { "dbo.COMPRA", "Compra" },
                { "dbo.VENDA", "Venda" },
                { "dbo.PRODUTOS_VENDA", "Venda" },
                { "dbo.ORCAMENTO", "Orçamento" },
                { "dbo.PRODUTOS_ORCAMENTO", "Produtos do Orçamento" },
                { "dbo.PRODUTO", "Produto" },
                { "dbo.INSUMO", "Insumo" },
                { "dbo.FUNCIONARIO", "Funcionário" }
             };

            try{
                foreach(var reg in Messages.Keys)
                {
                    var match = Regex.Match(e.Message, reg);
                    if (match.Success)
                    {
                        string friendlyInstruction = "";
                        if (match.Groups["Instruction"] != null)
                        {
                            friendlyInstruction = Instructions[match.Groups["Instruction"].Value] ??
                                                match.Groups["Instruction"].Value;
                        }
                        string friendlyTable = "";
                        if (match.Groups["Table"] != null)
                        {
                            friendlyTable = Tables[match.Groups["Table"].Value] ??
                                                match.Groups["Table"].Value;
                        }
                        var groups = match.Groups.Cast<Group>().Select(x => x.Value);
                        var strings = new [] {friendlyInstruction, friendlyTable};
                        return String.Format(Messages[reg], strings.Concat(groups).ToArray());
                    }
                }
                return "Erro inesperado de banco de dados.";
            }
            catch{
                return "Erro na tradução da mensagem do banco de dados.";
            }
        }
    }
}
