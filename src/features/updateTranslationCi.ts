import { Octokit } from '@octokit/rest';
import simpleGit from 'simple-git';
import {
  getCommittedTranslationFiles,
  processCommittedTranslationFile,
} from '../translation';
const git = simpleGit();
export const updateTranslationCi = async ({
  defaultLanguage,
  otherLanguages,
  openAiApiKey,
  githubToken,
}: {
  defaultLanguage: string;
  otherLanguages: string[];
  openAiApiKey: string | undefined;
  githubToken: string;
}) => {
  try {
    if (!openAiApiKey) {
      console.log('OpenAI API key is required');
      return;
    }

    const committedTranslationFiles = await getCommittedTranslationFiles({
      defaultLanguage,
    });

    if (typeof committedTranslationFiles === 'string') {
      console.log(committedTranslationFiles);
      return;
    }

    if (committedTranslationFiles instanceof Error) {
      console.log(committedTranslationFiles.message);
      return;
    }

    await git.fetch();

    // Generate a unique branch name based on the current timestamp
    const branchName = 'new-branch-' + Date.now();

    await git.checkoutLocalBranch(branchName);

    // Create and checkout the new branch
    await git.checkoutLocalBranch(branchName);

    committedTranslationFiles.forEach(async (committedTranslationFile) => {
      processCommittedTranslationFile({
        changedTranslationFile: committedTranslationFile,
        openAiApiKey,
        otherLanguages,
      });
    });

    await git.add('*');

    await git.commit('test: update translation files');

    await git.push('origin', branchName);

    console.log(`Changes pushed to the branch ${branchName}`);

    const octokit = new Octokit({ auth: githubToken });

    const { data: pullRequest } = await octokit.rest.pulls.create({
      owner: 'owner', // replace with the repo owner's username
      repo: 'repo', // replace with the repo name
      title: 'Pull Request Title', // replace with the PR title
      body: 'Pull Request Description', // replace with the PR description
      head: branchName, // the name of the branch where your changes are
      base: 'main', // the branch you want to merge your changes into
    });

    console.log(`Pull request created with number ${pullRequest.number}`);
  } catch (error) {
    console.log(error);
    return;
  }
};
