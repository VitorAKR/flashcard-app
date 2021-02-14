-- FAZER SELECT COUNT PRA OS DADOS DO DASHBOARD
-- GERANDO COLUNAS VIRTUAIS PARA TRANSPOR NA APP

SELECT
	(SELECT 
			COUNT(*)
		FROM
			tb_lessons where nextRevision <= date(now()) AND timesRepeated < 4 ) AS nrrevisions,
	(SELECT 
			COUNT(*)
		FROM
			tb_lessons) AS nrlessons,
	(SELECT 
			COUNT(*)
		FROM
			tb_flashcards) AS nrflashcards,
	(SELECT 
			COUNT(*)
		FROM
			tb_categories) AS nrcategories,
     (SELECT 
			COUNT(*)
		FROM
			tb_users) AS nrusers       